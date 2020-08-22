import { PathfindingAlg } from './index';
import Graph from "../graph";

class MM_TD_Pathfinding implements PathfindingAlg {
    graph: Graph | null
    constructor(){
        this.graph = null;
    }

    Execute(g: Graph, s: number, d: number, depTime:number){
        return [];
    }
};

export default MM_TD_Pathfinding;