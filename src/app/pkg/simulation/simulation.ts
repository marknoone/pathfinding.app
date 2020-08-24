import Graph from "./graph";
import EventManager from './events';
import ActiveVehicle from './vehicle';
import ActiveStations from './station';
import { put } from 'redux-saga/effects';
import ActivePassenger from './passenger';
import { Scenario } from '../../../editor/constants';
import { SimulationFrame, FrameContainer } from '.';
import { EvaluateMiddlewareFunc } from './middlewares';
import { getSimulationPassengers, getSimulationVehicles, getStations } 
    from './selectors';
import { SetBakedFrames } 
    from '../../../editor/components/rightPanel/components/simulationView/actions';
import { SimulationActionTypes, SimulationAction } 
    from '../../../editor/components/rightPanel/components/simulationView/constants';

class Simulator {
    g: Graph
    s: Scenario
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
    }

    *SimulateScenario(middleware?: EvaluateMiddlewareFunc) {
        const DAY = 24 * 60 * 60;
        const frameContianer: FrameContainer = {}; 
        for(let second = 0; second < DAY; second++){
            const simulationFrame: SimulationFrame = {passengers: {}, stations: {}, vehicles: {}};
    
            // Evaluate active vehicles and passengers
            simulationFrame.vehicles = this.simulationVehicles.reduce((accum, av) => {
                const f = av.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [av.getID()] : f } :{} )}
            }, {});

            simulationFrame.passengers = this.simulationPassengers.reduce((accum, ap) => {
                const f = ap.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [ap.getID()] : f } :{} )}
            }, {});
            
            simulationFrame.stations = this.simulationStations.reduce((accum, as) => {
                const f = as.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [as.getID()] : f } :{} )}
            }, {});
            
            // Evaluate middlewares and push to simulationFrame.
            const evalFrame = middleware? middleware(simulationFrame): {};
            
            frameContianer[second] = {
                simulation: simulationFrame,
                evaluation: {}
            };

            if(second%1000 === 0)
                yield put(SetBakedFrames(second));
        }

        return frameContianer;
    }
}

export default Simulator;