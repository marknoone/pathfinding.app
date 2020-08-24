import Graph from "./graph";
import EventManager from './events';
import ActiveVehicle from './vehicle';
import ActiveStations from './station';
import { put } from 'redux-saga/effects';
import ActivePassenger from './passenger';
import { Scenario } from '../../../editor/constants';
import { SimulationFrame } from '.';
import { EvaluateMiddlewareFunc } from './middlewares';
import { getSimulationPassengers, getSimulationVehicles, getStations } 
    from './selectors';
import { SetBakedFrames } 
    from '../../../editor/components/rightPanel/components/simulationView/actions';
import { SimulationActionTypes, Algorithms, SimulationAction } 
    from '../../../editor/components/rightPanel/components/simulationView/constants';

// Algorithms
import Dijkstra from './algorithms/dijkstra';
import TD_Dijkstra from './algorithms/td-dijkstra';
import MM_TD_Dijkstra from './algorithms/mm-td-dijkstra';
import CMT_Dijkstra from './algorithms/cmt-dijkstra';
import { PathfindingAlg } from './algorithms';

class Simulator {
    g: Graph
    s: Scenario
    alg: PathfindingAlg
    eventManager: EventManager
    simulationStations: ActiveStations[]
    simulationVehicles: ActiveVehicle[]
    simulationPassengers: ActivePassenger[]

    constructor(s :Scenario, scenarioNodeSize: number, scenarioDimens: number[], ){
        this.s = s;
        this.eventManager = new EventManager();
        this.g = new Graph(s, scenarioNodeSize, scenarioDimens);
        this.simulationStations = getStations(s, this.g);
        this.simulationVehicles = getSimulationVehicles(s, this.g);
        this.simulationPassengers = getSimulationPassengers(s, this.g);

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
            simulationFrame.passengers = this.simulationPassengers.reduce((accum, ap) => {
                const f = ap.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [ap.getID()] : f } :{} )}
            }, {});

            simulationFrame.vehicles = this.simulationVehicles.reduce((accum, av) => {
                const f = av.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [av.getID()] : f } :{} )}
            }, {});
            
            simulationFrame.stations = this.simulationStations.reduce((accum, as) => {
                const f = as.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [as.getID()] : f } :{} )}
            }, {});
            
            // Evaluate middlewares and push to simulationFrame.
            const evalFrame = middleware? middleware(simulationFrame): {};
            
            // Push simulation frame to store & update UI if needed.
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
                yield put(SetBakedFrames(second));
        }

        return null;
    }
}

export default Simulator;