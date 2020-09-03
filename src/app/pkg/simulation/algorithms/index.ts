import { Path, Edge } from "..";
import Graph from "../graph";

export interface PathfindingAlg {
    Execute(
        g:Graph,
        startNodeID: number,
        destNodeID: number,
        depTime: number
    ): Path;
} 

export type Previous = { prevNode: number, traversingEdge: Edge}