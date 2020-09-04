import Graph from "../graph";
import { Previous } from ".";
import { Path, PathSegment, EmptyPath } from "..";
import { TransitModes } from "../../../../editor/components/leftPanel/components/componentView/constants";
import { Algorithms } from "../../../../editor/components/rightPanel/components/simulationView/constants";


export const CalculatePath = (
    g: Graph,  
    prev: { [nID:number] :Previous | null },
    source: number, destination:number, departure: number
):Path => {
    const path: Path = EmptyPath;
    let isLastSeg = true, foundSrc = false;
    let currNode: number = destination;
    let totalTravelTime = 0;
    let timeWaiting: number[][] = []
    
    do {
        if(currNode !== source && !prev[currNode]) {
            console.error("Incomplete Path Error: Dijkstra...");
            return EmptyPath;
        }
        
        let currSegment:PathSegment = { 
            nodes : [{
                isLast: true,
                nID: currNode,
                coord: g.nodes[currNode].center,
                stopID: prev[currNode]!.traversingEdge.mode === TransitModes.FOOT? undefined:
                    g.getStationAtNode(currNode),
            }],
            mode: prev[currNode]!.traversingEdge.mode,
            route: prev[currNode]!.traversingEdge.routeID,
            isLast: isLastSeg
        }


        while(
            prev[currNode] &&
            prev[currNode]!.prevNode !== source &&
            prev[currNode]!.traversingEdge.mode === currSegment.mode 
        ){
            if(
                currSegment.route &&
                prev[currNode]!.traversingEdge.routeID !== currSegment.route 
            ) break; // Push segment if new route...

            let prevEdge = prev[currNode]!;
            currSegment.nodes.unshift({
                isLast: false,
                nID: prevEdge.prevNode,
                coord: g.nodes[prevEdge.prevNode].center,
                stopID: currSegment.mode === TransitModes.FOOT? undefined:
                g.getStationAtNode(prevEdge.prevNode),
            });
            
            currNode = prevEdge.prevNode;
            totalTravelTime += g.algorithm === Algorithms.Dijkstra? prevEdge.traversingEdge.weight(): 
                prevEdge.traversingEdge.tdWeight(departure+totalTravelTime);
        }

        if(prev[currNode] && prev[currNode]!.prevNode === source){
            currSegment.nodes.unshift({
                isLast: false,
                nID: source,
                coord: g.nodes[source].center,
                stopID: currSegment.mode === TransitModes.FOOT? undefined:
                    g.getStationAtNode(source),
            });
            foundSrc = true;
        }

        isLastSeg = false;
        path.data.unshift(currSegment);

    } while(!foundSrc);

    path.totalTime = totalTravelTime;
    path.timeWaiting = timeWaiting;
    return path;
}