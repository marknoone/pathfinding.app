import { Graph, Path } from "../constants";

export interface PathfindingAlg {
    Execute(
        startNodeID: number,
        destNodeID: number,
        depTime: number
    ): Path;
} 