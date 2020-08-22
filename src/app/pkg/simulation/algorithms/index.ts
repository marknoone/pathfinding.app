import { Path } from "..";
import Graph from "../graph";

export interface PathfindingAlg {
    Execute(
        g:Graph,
        startNodeID: number,
        destNodeID: number,
        depTime: number
    ): Path;
} 