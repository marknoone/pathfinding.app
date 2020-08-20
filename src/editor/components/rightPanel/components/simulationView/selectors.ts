import { createSelector } from 'reselect';
import { AppState } from '../../../../../store';
import { Graph, Node, Edge } from './constants';
import { Scenario } from '../../../../constants';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import { TransitModes } from '../../../leftPanel/components/componentView/constants';
import { AddDepartureToRouteModal } from '../../../../../modalManager/modals';

const getCanvasState = (state: AppState) => state.canvas;
const getScenarioState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx];
export const getGraph = createSelector<AppState, Scenario, CanvasState, Graph>( 
    getScenarioState, 
    getCanvasState, 
    (s: Scenario, c: CanvasState) => {
        const bSize = c.boxSize;
        const opts = s.simulation.options;
        const [cWidth, cHeight] = c.canvasSize;
        const dist = (a:{x:number, y:number}, b:{x:number, y:number}) =>
            Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        const ModeSpeedMap = {
            [TransitModes.FOOT]:  s.simulation.options.modeSpeeds.foot,
            [TransitModes.TRAIN]: s.simulation.options.modeSpeeds.train,
            [TransitModes.TRAM]:  s.simulation.options.modeSpeeds.tram,
            [TransitModes.BUS]:   s.simulation.options.modeSpeeds.bus,
        }

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
        Object.keys(graph.nodes).forEach((k:string)=>{
            const id = +k, node = graph.nodes[id];
            const candidates = [
                { x: node.center.x, y: node.center.y - bSize },
                { x: node.center.x, y: node.center.y + bSize },
                { x: node.center.x - bSize, y: node.center.y },
                { x: node.center.x + bSize, y: node.center.y },
            ];

            
            let edges: Edge[] =[]
            candidates.forEach((cand) => {
                const n = findNodeWithCoordinates(graph, bSize, c.canvasSize, cand, [(n:Node) => n.id === id]);
                if(n){
                    const weight = (
                        dist(node.center, graph.nodes[n].center) * opts.distanceMul
                    ) / ModeSpeedMap[TransitModes.FOOT];
                    edges.push({
                        to: n, 
                        mode: TransitModes.FOOT, 
                        weight: () => Math.round(weight),
                        tdWeight: (timeSecs) => Math.round(weight), // No departures on foot accesible nodes.
                        congestion: (timeSecs) => 1,
                    })
                }
            })
            graph.edges[id] = [...edges];
        })

        // 3. Iterate through routes and add respective edges
        Object.keys(s.routes.data).forEach((r:String) => {
            const id = +r, route = s.routes.data[id];

            const sortedDepKeys = Object.keys(route.departures).sort();
            let deps = sortedDepKeys.map((k:string) => route.departures[+k].value)
            console.log(sortedDepKeys);
            if(Object.keys(route.stations).length > 1){
                const sortedKeys = Object.keys(route.stations).sort();
                for(let i = 1; i < sortedKeys.length; i++){
                    const currDeps = [...deps];
                    const prevStnID = route.stations[+sortedKeys[i-1]],
                        prevStn = s.stations.data[prevStnID.id];
                    const currentStnID = route.stations[+sortedKeys[i]],
                        currStn = s.stations.data[currentStnID.id]; 
                    
                    const prevStnNodeID = findNodeWithCoordinates(graph, bSize, c.canvasSize, prevStn.coordinates); 
                    const currStnNodeID = findNodeWithCoordinates(graph, bSize, c.canvasSize, currStn.coordinates);

                    if(prevStnNodeID && currStnNodeID){
                        const weight = (
                            dist(prevStn.coordinates, currStn.coordinates) * opts.distanceMul
                        ) / ModeSpeedMap[route.mode];

                        graph.edges[prevStnNodeID] = [
                            ...graph.edges[prevStnNodeID],
                            {
                                to: currStnNodeID, 
                                mode: route.mode, 
                                weight: () => Math.round(weight),
                                tdWeight: (timeSecs) => {
                                    const sortedDepartures = currDeps.sort();
                                    const closestDep = sortedDepartures.find((d:number) => timeSecs < d);
                                    return closestDep? (closestDep - timeSecs) + Math.round(weight): 9999999
                                },
                                congestion: (timeSecs) => 1,
                            }
                        ]

                        // Add travelling time for next stop departures
                        deps = deps.map((d: number) => d + Math.round(weight)) 
                    } else {
                        console.error("Incomplete route:", route);
                        console.error("Expect inconsistant results...");
                    }
                }
            }
        });

        return graph;
    }
);

export const findNodeWithCoordinates = (
    graph: Graph,
    boxSize: number,
    dimensions: number[],
    coords: {x: number, y:number}, 
    predicates?: ((n: Node)=>boolean)[] 
):(number|null) => {
    const [cWidth, cHeight] = dimensions;
    const id = Object.keys(graph.nodes).find((k: string) => {
        const n = graph.nodes[+k], h = boxSize/2;
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
