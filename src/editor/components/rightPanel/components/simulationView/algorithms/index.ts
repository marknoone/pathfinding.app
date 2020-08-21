import { Path } from "../simulation";

export interface PathfindingAlg {
    Execute(
        startNodeID: number,
        destNodeID: number,
        depTime: number
    ): Path;
} 