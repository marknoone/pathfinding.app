import Graph from "./graph";
import ActiveVehicle from './vehicle';
import { put } from 'redux-saga/effects';
import ActivePassenger from './passenger';
import { Scenario } from '../../../editor/constants';
import { EvaluateMiddlewareFunc } from './middlewares';
import { getSimulationPassengers, getSimulationVehicles, getStationQueues} 
    from './selectors';
import { SimulationActionTypes, Algorithms, SimulationAction } 
    from '../../../editor/components/rightPanel/components/simulationView/constants';

// Algorithms
import Dijkstra from './algorithms/dijkstra';
import TD_Dijkstra from './algorithms/td-dijkstra';
import MM_TD_Dijkstra from './algorithms/mm-td-dijkstra';
import CMT_Dijkstra from './algorithms/cmt-dijkstra';
import { PathfindingAlg } from './algorithms';
import { SimulationFrame, StationQueues } from '.';

class Simulator {
    g: Graph
    s: Scenario
    alg: PathfindingAlg
    stationQueues: StationQueues
    simulationVehicles: ActiveVehicle[]
    simulationPassengers: ActivePassenger[]

    constructor(s :Scenario, scenarioNodeSize: number, scenarioDimens: number[], ){
        this.s = s;
        this.g = new Graph(s, scenarioNodeSize, scenarioDimens);
        this.simulationVehicles = getSimulationVehicles(s);
        this.simulationPassengers = getSimulationPassengers(s.passengers.tree, this.g);
        this.stationQueues = getStationQueues(s.routes);

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
            const simulationFrame: SimulationFrame = {passengers: {}, stations: {}, vehicles: {}};
    
            // Evaluate active vehicles and passengers
            simulationFrame.vehicles = this.simulationVehicles.reduce((accum, av) => {
                const f = av.Simulate(this.s.stations.data, second);
                return { ...accum, ...(f? { [av.getID()] : f } :{} )}
            }, {});
            
            simulationFrame.passengers = this.simulationPassengers.reduce((accum, av) => {
                const f = av.Simulate();
                return { ...accum, ...(f? { [av.getID()] : f } :{} )}
            }, {});
            
            // Evaluate middlewares and push to simulationFrame.
            const evalFrame = middleware? middleware(simulationFrame): {};
            
            // 5. Push simulation frame to store & update UI if needed.
            const frameAction: SimulationAction = { 
                type: SimulationActionTypes.PUSH_BAKED_FRAME,
                payload: {
                    simFrame: second, 
                    dataFrame: simulationFrame, 
                    evalFrame: {} //evalFrame
                }
            };
    
            yield put(frameAction);
            if(second%1000 === 0)
                yield put({ type: SimulationActionTypes.INC_BAKED_FRAMES }) // TODO: Set baked frames...
        }

        return null;
    }
}

export default Simulator;