import { PathfindingAlg } from './index';
import Graph from "../graph";
import { EmptyPath } from '..';

class CMTPathfinding implements PathfindingAlg {
    graph: Graph | null
    constructor(){
        this.graph = null;
    }

    Execute(g: Graph, s: number, d: number, depTime:number){
        return EmptyPath;
    }
};

export default CMTPathfinding;