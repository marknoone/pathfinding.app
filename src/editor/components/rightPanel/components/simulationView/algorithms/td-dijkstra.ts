import { PathfindingAlg } from './index';
import { Graph } from "../constants";

class TDPathfinding implements PathfindingAlg {
    graph: Graph
    constructor(g: Graph){
        this.graph = g;
    }

    Execute(s: number, d: number, depTime:number){
        return [];
    }
};

export default TDPathfinding;