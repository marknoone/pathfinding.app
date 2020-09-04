import { Node, Edge, Path, Coord } from ".";
import { distance as dist } from "./geometry";
import { PathfindingAlg } from "./algorithms";
import { Scenario } from "../../../editor/constants";
import { TransitModes } 
    from "../../../editor/components/leftPanel/components/componentView/constants";
import { Algorithms } 
    from "../../../editor/components/rightPanel/components/simulationView/constants";

// Algorithms
import Dijkstra from './algorithms/dijkstra';
import TD_Dijkstra from './algorithms/td-dijkstra';
import MM_TD_Dijkstra from './algorithms/mm-td-dijkstra';
import CMT_Dijkstra from './algorithms/cmt-dijkstra';

class Graph {
    boxSize: number;
    canvasSize: number[];
    alg: PathfindingAlg
    simAlg: Algorithms

    nodes: { [nID: number]: Node   }
    edges: { [nID: number]: Edge[] }
    stationMap: { [sID:number]: number }

    constructor(s: Scenario, bSize: number, dimens: number[]){
        this.boxSize = bSize;
        this.canvasSize = dimens;
        this.nodes = {}
        this.edges = {}
        this.stationMap = {}
        this.simAlg = s.simulation.algorithm;

        switch(s.simulation.algorithm) {
            case Algorithms.TimeDependentDijkstra: 
                this.alg = new TD_Dijkstra();
            case Algorithms.MultiModalTimeDependentDijkstra: 
                this.alg = new MM_TD_Dijkstra();
            case Algorithms.CMTDijkstra: 
                this.alg = new CMT_Dijkstra();
            default: 
                this.alg = new Dijkstra();
        }

        const opts = s.simulation.options;
        const [cWidth, cHeight] = this.canvasSize;
        
        const ModeSpeedMap = {
            [TransitModes.FOOT]:  s.simulation.options.modeSpeeds.foot,
            [TransitModes.TRAIN]: s.simulation.options.modeSpeeds.train,
            [TransitModes.TRAM]:  s.simulation.options.modeSpeeds.tram,
            [TransitModes.BUS]:   s.simulation.options.modeSpeeds.bus,
        }

        // 1. Create all graph nodes.
        let nodeID = 1;
        for(let i = 0; (i+this.boxSize) <= cWidth; i+=this.boxSize){
            for(let j = 0; (j+this.boxSize) <= cHeight; j+=this.boxSize){
                this.nodes[nodeID] = { 
                    id: nodeID,
                    center: {
                        x: i + (this.boxSize/2), 
                        y: j + (this.boxSize/2)
                    },
                };
                nodeID++;
            }
        }

        // 2. Create stationNode map.
        Object.keys(s.stations.data).forEach((stnK:string) => {
            const stnID = +stnK, stn = s.stations.data[stnID];
            const nID = this.getNodeFromCoordinates(stn.coordinates);
            if(nID)
                this.stationMap[stnID] = nID;
        });

        // 3. Iterate through and connect nodes above, 
        //      below, and of either side if present.
        Object.keys(this.nodes).forEach((k:string)=>{
            const id = +k, node = this.nodes[id];
            const candidates = [
                { x: node.center.x, y: node.center.y - this.boxSize },
                { x: node.center.x, y: node.center.y + this.boxSize },
                { x: node.center.x - this.boxSize, y: node.center.y },
                { x: node.center.x + this.boxSize, y: node.center.y },
            ];

            
            let edges: Edge[] =[]
            candidates.forEach((cand) => {
                const n = this.getNodeFromCoordinates(cand, [(n:Node) => n.id === id]);
                if(n){
                    const weight = (
                        dist(node.center, this.nodes[n].center) * opts.distanceMul
                    ) / ModeSpeedMap[TransitModes.FOOT];
                    edges.push({
                        to: n, 
                        mode: TransitModes.FOOT, 
                        routeID:  null,
                        weight: () => Math.round(weight),
                        tdWeight: (timeSecs) => Math.round(weight), // No departures on foot accesible nodes.
                        congestion: (timeSecs) => 1,
                    })
                }
            })
            this.edges[id] = [...edges];
        })

        // 4. Iterate through routes and add respective edges
        Object.keys(s.routes.data).forEach((r:String) => {
            const id = +r, route = s.routes.data[id];

            const sortedDepKeys = Object.keys(route.departures).sort();
            let deps = sortedDepKeys.map((k:string) => route.departures[+k].value)
            if(Object.keys(route.stations).length > 1){
                const sortedKeys = Object.keys(route.stations).sort();
                for(let i = 1; i < sortedKeys.length; i++){
                    const currDeps = [...deps];
                    const prevStnID = route.stations[+sortedKeys[i-1]],
                        prevStn = s.stations.data[prevStnID.id];
                    const currentStnID = route.stations[+sortedKeys[i]],
                        currStn = s.stations.data[currentStnID.id]; 
                    
                    const prevStnNodeID = this.stationMap[prevStnID.id]; 
                    const currStnNodeID = this.stationMap[currentStnID.id];

                    if(prevStnNodeID && currStnNodeID){
                        const weight = (
                            dist(prevStn.coordinates, currStn.coordinates) * opts.distanceMul
                        ) / ModeSpeedMap[route.mode];

                        this.edges[prevStnNodeID] = [
                            ...this.edges[prevStnNodeID],
                            {
                                to: currStnNodeID, 
                                mode: route.mode, 
                                routeID: route.id,

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
    }

    getNodeFromCoordinates(  
        coords: {x: number, y:number}, 
        predicates?: ((n: Node)=>boolean)[] 
    ):(number|null) {
        const id = Object.keys(this.nodes).find((k: string) => {
            const n = this.nodes[+k], h = this.boxSize/2;
            const l=n.center.x-h, r=n.center.x+h, 
                t=n.center.y-h, b=n.center.y+h;
            
            if(coords.x < l || coords.x < 0) return false;
            if(coords.y < t || coords.y < 0) return false;
            if(coords.x > r || coords.x > this.canvasSize[0]) return false;
            if(coords.y > b || coords.y > this.canvasSize[1]) return false;
            if(predicates){ 
                for(let idx = 0; idx < predicates.length; idx++)
                    if(predicates[idx](n)) { return false; }
            }

            return true
        });

        return id?+id:null;
    }

    getAlg = ():Algorithms => this.simAlg; 

    getStationAtNode(node:number) {
        const stn = Object.keys(this.stationMap).find((stn:string) =>
            this.stationMap[+stn] === node);
        
        return stn? +stn: undefined;
    }


    computePath(start: Coord, destination: Coord, depTime: number):(Path|null) {
        const startNode = this.getNodeFromCoordinates(start);
        const destinationNode = this.getNodeFromCoordinates(destination);
        if(startNode && destinationNode)
            return this.alg.Execute(this, startNode, destinationNode, depTime);
        return null
    }
}

export default Graph;