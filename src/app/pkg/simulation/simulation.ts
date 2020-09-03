import Graph from "./graph";
import EventManager from './events';
import ActiveVehicle from './vehicle';
import ActiveStations from './station';
import { put, delay } from 'redux-saga/effects';
import ActivePassenger from './passenger';
import { Scenario } from '../../../editor/constants';
import { SimulationFrame, FrameContainer, SimulationResults } from '.';
import { getSimulationPassengers, getSimulationVehicles, getStations } 
    from './selectors';
import { SetBakedFrames, PushPassengerPath } 
    from '../../../editor/components/rightPanel/components/simulationView/actions';
import { EvaluateMiddlewareFunc, PassengerTransferMiddleware, MissedPassengerMiddleware } 
    from './middlewares';
import { PassengerEventTags, isPassengerEventObj } from "./events/passenger";
    
class Simulator {
    g: Graph
    s: Scenario
    eventManager: EventManager
    simulationStations: { [sID: number]: ActiveStations }
    simulationVehicles: { [vID: number]: ActiveVehicle }
    simulationPassengers: { [pID: number]: ActivePassenger }

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

        console.log(this.simulationStations);
        console.log(this.simulationVehicles);
        console.log(this.simulationPassengers);

        for(let second = 0; second < DAY; second++){
            const simulationFrame: SimulationFrame = {passengers: {}, stations: {}, vehicles: {}};
    
            // Evaluate active vehicles and passengers
            simulationFrame.vehicles = Object.keys(this.simulationVehicles).reduce((accum, avID) => {
                const av = this.simulationVehicles[+avID];
                const f = av.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [av.getID()] : f } :{} )}
            }, {});

            simulationFrame.passengers = Object.keys(this.simulationPassengers).reduce((accum, apID) => {
                const ap = this.simulationPassengers[+apID];
                const f = ap.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [ap.getID()] : f } :{} )}
            }, {});
            
            simulationFrame.stations = Object.keys(this.simulationStations).reduce((accum, asID) => {
                const as = this.simulationStations[+asID];
                const f = as.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [as.getID()] : f } :{} )}
            }, {});
            
            // Evaluate middlewares and push to simulationFrame.
            const evalFrame = middleware? middleware(simulationFrame, this.eventManager): {};
            
            // frameContainer[second] = {
            //     simulation: simulationFrame,
            //     evaluation: {}
            // };

            let events = this.eventManager.getEventsWithTag(PassengerEventTags[PassengerEventTags.PATH_CALCULATED]);
            for(let i = 0; i < events.length; i++){
                const obj = events[i].getObj();
                this.eventManager.deleteEvent(events[i].getID());
                if(isPassengerEventObj(obj)){
                    if(obj.path && obj.alg) {
                        console.log(obj.path)
                        yield put(PushPassengerPath(obj.passengerID, { 
                            [obj.alg as number]: {
                                path: obj.path.path, 
                                isActive: obj.path.isActive
                            }
                        }));   
                    }
                }
            }

            this.eventManager.cleanup(second);
            if(second%1000 === 0){
                yield put(SetBakedFrames(second));
                yield delay(50);
            }
        }

        const results: SimulationResults = {
            totalFrames: DAY,
            metrics: {
                vehicleTotal: Object.keys(this.simulationVehicles).length,
                passengerTotal: Object.keys(this.simulationPassengers).length,
                stationTotal: Object.keys(this.simulationStations).length,
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