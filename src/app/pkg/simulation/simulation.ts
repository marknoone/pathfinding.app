import { put } from 'redux-saga/effects';
import ActiveVehicle from './vehicle';
import ActivePassenger from './passenger';
import Graph from "./graph";
import { SimulationActionTypes, Algorithms, SimulationAction } from '../../../editor/components/rightPanel/components/simulationView/constants';
import { Passenger } from '../../../editor/components/leftPanel/components/passengerView/constants';
import { TransitModes } from '../../../editor/components/leftPanel/components/componentView/constants';
import { getSimulationPassengers, getSimulationVehicles} from './selectors';
import { EvaluateMiddlewareFunc } from './middlewares';
import { Scenario } from '../../../editor/constants';
import { Queue } from '../queues';

// Algorithms
import Dijkstra from './algorithms/dijkstra';
import TD_Dijkstra from './algorithms/td-dijkstra';
import MM_TD_Dijkstra from './algorithms/mm-td-dijkstra';
import CMT_Dijkstra from './algorithms/cmt-dijkstra';
import { PathfindingAlg } from './algorithms';
import { SimulationFrame } from '.';

type StationQueues = {
    [routeID: number]: { 
        [stationID:number]: Queue<number>
    }
};

class Simulator {
    g: Graph
    s: Scenario
    alg: PathfindingAlg
    stationQueues: StationQueues
    simulationVehicles: ActiveVehicle[]
    simulationPassengers: ActivePassenger[]

    constructor(s :Scenario, scenarioNodeSize: number, scenarioDimens: number[], ){
        this.s = s;
        const { stations, routes, ...rest }: Scenario = this.s;
        this.g = new Graph(s, scenarioNodeSize, scenarioDimens);
        this.stationQueues = Object.keys(routes.data).reduce((mainAccum, r) => {

            const routeStationQueues = Object.keys(routes.data[+r].stations).reduce((accum, k) => {
                const stn = routes.data[+r].stations[+k];
                return { ...accum, [stn.id] : new Queue<number>() }
            },  {});
    
            return { ...mainAccum, [routes.data[+r].id]: routeStationQueues }
        }, {});

        this.simulationVehicles = getSimulationVehicles(s);
        this.simulationPassengers = getSimulationPassengers(s.passengers.tree, this.g);

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
    }

    *SimulateScenario(middleware?: EvaluateMiddlewareFunc){
        const DAY = 24 * 60 * 60;
        for(let second = 0; second < DAY; second++){
            // 1. Check for Passenger departures, get path and push to passenger set if exists...
            const simulationFrame: SimulationFrame = {passengers: {}, stations: {}, vehicles: {}};
            
    
            // 3. Evaluate active vehicle and passenger stacks
            this.simulationVehicles.forEach((av:ActiveVehicle) => {
                const f = av.Simulate(this.s.stations.data, second);
                if(f)
                    simulationFrame.vehicles[av.getID()] = f;
            });
            
            // 4. Evaluate middlewares and push to simulationObj.
            const evalFrame = middleware? middleware(simulationFrame): {};
            
            // 5. Push simulation frame to store & update UI if needed.
            const frameAction: SimulationAction = { 
                type: SimulationActionTypes.PUSH_BAKED_FRAME,
                payload: {simFrame: second, dataFrame: simulationFrame, evalFrame: {}}
            };
    
            yield put(frameAction);
            if(second%1000 === 0)
                yield put({ type: SimulationActionTypes.INC_BAKED_FRAMES }) // TODO: Set baked frames...
        }

        return null;
    }
}

export default Simulator;