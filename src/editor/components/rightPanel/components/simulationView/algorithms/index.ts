import { Graph } from "../constants";

export interface PathfindingAlg {
    Execute(
        start: {x:number, y: number},
        dest: {x:number, y: number},
        g:Graph
    );
} 