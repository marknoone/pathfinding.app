import Graph from "../graph";
import { Previous } from ".";
import { Path, PathSegment } from "..";
import { TransitModes } from "../../../../editor/components/leftPanel/components/componentView/constants";

export const CalculatePath = (
    g: Graph,  
    prev: { [nID:number] :Previous | null },
    source: number, destination:number
):Path => {
    const path: Path = [];
    let isLastSeg = true, foundSrc = false;
    let currNode: number = destination;
    
    do {
        if(currNode !== source && !prev[currNode]) {
            console.error("Incomplete Path Error: Dijkstra...");
            return [];
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
        path.unshift(currSegment);

    } while(!foundSrc);

    return path;
}