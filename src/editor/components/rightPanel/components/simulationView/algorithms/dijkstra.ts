import { Graph, Edge } from "../simulation";
import { PathfindingAlg } from './index';
import { PriorityQueue } from '../../../../../../app/pkg/queues';

class DijkstraPathfinding implements PathfindingAlg {
    graph: Graph
    nodeCnt: number
    settled: Set<number>
    pq: PriorityQueue<number>
    prev: { [nID:number] :number | null }
    dist: { [nID:number] :number }

    constructor(g:Graph){ 
        this.graph = g;
        this.dist = {};
        this.prev = {};
        this.settled = new Set<number>();
        this.pq = new PriorityQueue<number>(); 
        this.nodeCnt = Object.keys(g.nodes).length;
    }

    Execute(s: number, d: number, depTime:number){
        // Init
        this.dist = {};
        this.pq.Clear();
        this.settled = new Set<number>();

        Object.keys(this.graph.nodes).forEach((k:string) => {
            const nID = +k;
            this.prev[nID] = null; 
            this.dist[nID] = Number.MAX_SAFE_INTEGER;
        })

        // Start PQ/Distance with starting node.
        this.dist[s] = 0; 
        this.pq.Enqueue(s, 0); 

        while (!this.pq.IsEmpty()){
            const currNode = this.pq.Dequeue();
            if(!currNode) return [];
            if(currNode === d) return []; // TODO: Return path

            this.graph.edges[currNode].forEach((e: Edge) => { 
                const n = this.graph.nodes[e.to];
                if (!this.settled.has(n.id)){
                    const w = this.dist[currNode] + e.weight()
                    this.pq.Enqueue(n.id, w);
                    this.dist[n.id] = w; 
                    this.prev[n.id] = currNode;
                    this.settled.add(n.id);
                } else {
                    let newDistance = this.dist[currNode] + e.weight();
                    if (newDistance < this.dist[n.id]) {
                        this.pq.UpdateElement(n.id, newDistance);
                        this.dist[n.id] = newDistance; 
                        this.prev[n.id] = currNode;
                    }
                }
            }); 
        }

        return [];
    }
};

export default DijkstraPathfinding;

// function dijkstra(G, S)
//     for each vertex V in G
//         distance[V] <- infinite
//         previous[V] <- NULL
//         If V != S, add V to Priority Queue Q
//     distance[S] <- 0
	
//     while Q IS NOT EMPTY
//         U <- Extract MIN from Q
//         for each unvisited neighbour V of U
//             tempDistance <- distance[U] + edge_weight(U, V)
//             if tempDistance < distance[V]
//                 distance[V] <- tempDistance
//                 previous[V] <- U
//     return distance[], previous[]


