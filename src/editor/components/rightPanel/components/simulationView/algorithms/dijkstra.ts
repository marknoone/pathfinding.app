import { Graph, Edge } from "../constants";
import { PathfindingAlg } from './index';
import { PriorityQueue } from '../../../../../../app/pkg/queues';

class DijkstraPathfinding implements PathfindingAlg {
    graph: Graph
    nodeCnt: number
    pq: PriorityQueue<number>
    settled: Set<number>
    dist: { [nID:number] :number }

    constructor(g:Graph){ 
        this.graph = g;
        this.dist = {};
        this.settled = new Set<number>();
        this.pq = new PriorityQueue<number>(); 
        this.nodeCnt = Object.keys(g.nodes).length;
    }

    Execute(s: number, d: number, depTime:number){
        // Init
        this.dist = {};
        this.settled = new Set<number>();
        this.pq.Clear();

        for (let i = 0; i < this.nodeCnt; i++) 
            this.dist[i] = Number.MAX_SAFE_INTEGER; 

        // Start PQ/Distance with starting node.
        this.dist[s] = 0; 
        this.pq.Enqueue(s, 0); 

        while (this.settled.size <= this.nodeCnt){
            const currNode = this.pq.Dequeue();
            if(currNode){
                this.settled.add(currNode);

                let edgeDistance: number = -1; 
                let newDistance: number = -1; 
        
                this.graph.edges[currNode].forEach((e: Edge) => { 
                    const n = this.graph.nodes[e.to];
        
                    // If current node hasn't already been processed 
                    if (!this.settled.has(n.id)) { 
                        edgeDistance = e.weight(); 
                        newDistance = this.dist[currNode] + edgeDistance; 
        
                        // If new distance is cheaper in cost 
                        if (newDistance < this.dist[n.id]) 
                            this.dist[n.id] = newDistance; 
        
                        // Add the current node to the queue 
                        this.pq.Enqueue(n.id, this.dist[n.id]); 
                    } 
                }); 
            }
        }

        return [];
    }
};

export default DijkstraPathfinding;



