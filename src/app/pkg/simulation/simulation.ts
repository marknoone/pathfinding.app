import Graph from "./graph";
import EventManager from './events';
import ActiveVehicle from './vehicle';
import ActiveStations from './station';
import { put } from 'redux-saga/effects';
import ActivePassenger from './passenger';
import { Scenario } from '../../../editor/constants';
import { SimulationFrame, FrameContainer, SimulationResults } from '.';
import { getSimulationPassengers, getSimulationVehicles, getStations } 
    from './selectors';
import { SetBakedFrames } 
    from '../../../editor/components/rightPanel/components/simulationView/actions';
import { EvaluateMiddlewareFunc, PassengerTransferMiddleware, MissedPassengerMiddleware } 
    from './middlewares';
    
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
        const frameContainer: FrameContainer = {}; 

        // Middlewares
        const [transferMiddleware, getPassengerTransfers] =  PassengerTransferMiddleware();
        const [missedPassengerMiddleware, getMissedPassengers] =  MissedPassengerMiddleware();

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
            const evalFrame = middleware? middleware(simulationFrame, this.eventManager): {};
            
            frameContainer[second] = {
                simulation: simulationFrame,
                evaluation: {}
            };

            if(second%1000 === 0)
                yield put(SetBakedFrames(second));
        }

        const results: SimulationResults = {
            totalFrames: DAY,
            metrics: {
                vehicleTotal: this.simulationVehicles.length,
                passengerTotal: this.simulationPassengers.length,
                stationTotal: this.simulationStations.length,
                passengerTransfers: getPassengerTransfers(),
                missedPassengers: getMissedPassengers()
            },

            passenger: {},
            vehicles: {},
            frame: {}
        }; 

        return {
            frames: frameContainer,
            results: results
        }
    }
}

export default Simulator;