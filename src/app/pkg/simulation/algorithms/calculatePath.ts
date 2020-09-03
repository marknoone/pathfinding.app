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
    let endOfSeg: number = destination;

    do {
        if(endOfSeg !== source && !prev[endOfSeg]) {
            console.error("Incomplete Path Error: Dijkstra...");
            return [];
        }

        let currSegment:PathSegment = { 
            nodes : [{
                isLast: true,
                coord: g!.nodes[endOfSeg].center,
                stopID: prev[endOfSeg]!.traversingEdge.mode !== TransitModes.FOOT? 
                    g.getStationAtNode(endOfSeg):
                    undefined
            }],
            mode: prev[endOfSeg]!.traversingEdge.mode,
            route: prev[endOfSeg]!.traversingEdge.routeID,
            isLast: isLastSeg
        }

        let prevNode = prev[endOfSeg];
        while(
            prevNode &&
            prevNode.prevNode !== source &&
            prevNode.traversingEdge.mode === currSegment.mode 
        ){
            if(
                currSegment.route &&
                prevNode.traversingEdge.routeID !== currSegment.route 
            ) break; // Push segment if new route...

            currSegment.nodes.unshift({
                isLast: false,
                coord: g.nodes[prevNode.prevNode].center,
                stopID: currSegment.mode === TransitModes.FOOT? undefined:
                    g.getStationAtNode(prevNode.prevNode),
            });

            prevNode = prev[prevNode.prevNode];
        }

        if(prevNode && prevNode.prevNode === source){
            currSegment.nodes.unshift({
                isLast: false,
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