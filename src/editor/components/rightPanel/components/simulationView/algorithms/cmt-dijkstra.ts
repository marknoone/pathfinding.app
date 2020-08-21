import { PathfindingAlg } from './index';
import { Graph } from "../simulation";

class CMTPathfinding implements PathfindingAlg {
    graph: Graph
    constructor(g: Graph){
        this.graph = g;
    }

    Execute(s: number, d: number, depTime:number){
        return [];
    }
};

export default CMTPathfinding;