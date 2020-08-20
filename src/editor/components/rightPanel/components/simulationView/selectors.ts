import { createSelector } from 'reselect';
import { AppState } from '../../../../../store';
import { Graph, Node, Edge } from './constants';
import { Scenario } from '../../../../constants';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import { TransitModes } from '../../../leftPanel/components/componentView/constants';

const getCanvasState = (state: AppState) => state.canvas;
const getScenarioState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx];
export const getGraph = createSelector<AppState, Scenario, CanvasState, Graph>( 
    getScenarioState, 
    getCanvasState, 
    (s: Scenario, c: CanvasState) => {
        const bSize = c.boxSize;
        const [cWidth, cHeight] = c.canvasSize;

        // Add all connected walking nodes
        let nodeID = 1;
        const graph: Graph = { nodes:{}, edges: [] };

        // 1. Create all graph nodes.
        for(let i = 0; (i+bSize) <= cWidth; i+=bSize){
            for(let j = 0; (j+bSize) <= cHeight; j+=bSize){
                graph.nodes[nodeID] = { 
                    id: nodeID, 
                    queue: null,
                    center: {
                        x: i + (bSize/2), 
                        y: j + (bSize/2)
                    },
                };
                nodeID++;
            }
        }

        // 2. Iterate through and connect nodes above, 
        //      below, and of either side if present.
        const findNodeWithCoordinates = (
            coords: {x: number, y:number}, 
            predicates?: ((n: Node)=>boolean)[] 
        ):(number|null) => {
            const id = Object.keys(graph.nodes).find((k: string) => {
                const n = graph.nodes[+k], h = bSize/2;
                const l=n.center.x-h, r=n.center.x+h, 
                    t=n.center.y-h, b=n.center.y+h;
                
                if(coords.x < l || coords.x < 0) return false;
                if(coords.y < t || coords.y < 0) return false;
                if(coords.x > r || coords.x > cWidth) return false;
                if(coords.y > b || coords.y > cHeight) return false;
                if(predicates){ 
                    for(let idx = 0; idx < predicates.length; idx++)
                        if(predicates[idx](n)) { return false; }
                }

                return true
            });

            return id?+id:null;
        }

        Object.keys(graph.nodes).forEach((k:string)=>{
            const id = +k, node = graph.nodes[id];
            const candidates = [
                { x: node.center.x, y: node.center.y - bSize },
                { x: node.center.x, y: node.center.y + bSize },
                { x: node.center.x - bSize, y: node.center.y },
                { x: node.center.x + bSize, y: node.center.y },
            ];

            
            let edges: Edge[] =[]
            candidates.forEach((c) => {
                const n = findNodeWithCoordinates(c, [(n:Node) => n.id === id]);
                if(n){
                    edges.push({
                        to: n, 
                        mode: TransitModes.FOOT, 
                        weight: (timeSecs) => 
                            s.simulation.options.modeSpeeds.foot,
                        congestion: (timeSecs) => 1,
                    })
                }
            })
            graph.edges[id] = [...edges];
        })

        console.log(graph);
        return { } as Graph
    }
);
