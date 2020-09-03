import { Edge } from "..";
import { Previous } from ".";
import Graph from "../graph";
import { PathfindingAlg } from './index';
import { PriorityQueue } from '../../queues';
import { CalculatePath } from './calculatePath';

class DijkstraPathfinding implements PathfindingAlg {
    graph: (Graph| null)
    nodeCnt: number
    settled: Set<number>
    pq: PriorityQueue<number>
    prev: { [nID:number] :Previous | null }
    dist: { [nID:number] :number }

    constructor(){ 
        this.dist = {};
        this.prev = {};
        this.nodeCnt = 0;
        this.graph = null;
        this.settled = new Set<number>();
        this.pq = new PriorityQueue<number>(); 
    }

    Execute(g:Graph, s: number, d: number, depTime:number){
        // Init
        if (!g) {
            console.error("Dijkstra pathfind needs graph to execute.")
            return [];
        }

        this.dist = {};
        this.pq.Clear();
        this.settled = new Set<number>();
        this.graph = g;
        this.nodeCnt = Object.keys(g.nodes).length;

        Object.keys(this.graph.nodes).forEach((k:string) => {
            const nID = +k;
            this.prev[nID] = null; 
            this.dist[nID] = Number.MAX_SAFE_INTEGER;
        });

        // Start PQ/Distance with starting node.
        this.dist[s] = 0; 
        this.pq.Enqueue(s, 0); 

        while (!this.pq.IsEmpty()){
            const currNode = this.pq.Dequeue();
            if(!currNode) return [];
            if(currNode === d) return CalculatePath(this.graph, this.prev, s, d);

            this.graph.edges[currNode].forEach((e: Edge) => { 
                const n = this.graph!.nodes[e.to];
                if (!this.settled.has(n.id)){
                    const w = this.dist[currNode] + e.weight()
                    this.pq.Enqueue(n.id, w);
                    this.dist[n.id] = w; 
                    this.prev[n.id] = {prevNode: currNode, traversingEdge: e};
                    this.settled.add(n.id);
                } else {
                    let newDistance = this.dist[currNode] + e.weight();
                    if (newDistance < this.dist[n.id]) {
                        this.pq.UpdateElement(n.id, newDistance);
                        this.dist[n.id] = newDistance; 
                        this.prev[n.id] = {prevNode: currNode, traversingEdge: e};
                    }
                }
            }); 
        }

        return [];
    }
};

export default DijkstraPathfinding;

