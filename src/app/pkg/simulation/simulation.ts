import Graph from "./graph";
import EventManager from './events';
import ActiveVehicle from './vehicle';
import ActiveStations from './station';
import { put, delay, call } from 'redux-saga/effects';
import ActivePassenger from './passenger';
import { Scenario } from '../../../editor/constants';
import { SimulationFrame, FrameContainer, SimulationResults } from '.';
import { getSimulationPassengers, getSimulationVehicles, getStations } 
from './selectors';
import { SetBakedFrames, PushPassengerPath } 
from '../../../editor/components/rightPanel/components/simulationView/actions';
import { PassengerEventTags, isPassengerEventObj } from "./events/passenger";
import { EvaluationFunc, PassengerTransferMiddleware, MissedPassengerMiddleware,
    PassengerJourneyTimeCounterMiddleware, VehicleWaitingTimeCounterMiddleware,
    PassengerWaitingTimeCounterMiddleware } from './middlewares';

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

    *SimulateScenario(start: number, end: number): 
        Generator<any, {frames: FrameContainer, results: SimulationResults}, any> 
    {
        const DAY = 24 * 60 * 60;
        const frameContainer: FrameContainer = {}; 
        const results: SimulationResults = {
            frames: { start: start, end: end },
            metrics:{
                vehicleTotal: Object.keys(this.simulationVehicles).length,
                passengerTotal: Object.keys(this.simulationPassengers).length,
                stationTotal: Object.keys(this.simulationStations).length,
                passengerTransfers: 0,
                missedPassengers: 0,
            },
            passenger: {},
            vehicles: {},
            frame: {}
        };

        // Middlewares
        const [transferMiddleware, getPassengerTransfers] =  PassengerTransferMiddleware();
        const [missedPassengerMiddleware, getMissedPassengers] =  MissedPassengerMiddleware();
        const [vehicleWaitingMiddleware, getVehicleWaiting] =  VehicleWaitingTimeCounterMiddleware();
        const [passengerWaitingMiddleware, getPassengerWaiting] =  PassengerWaitingTimeCounterMiddleware();
        const [passengerJourneyMiddleware, getPassengerJourney] =  PassengerJourneyTimeCounterMiddleware();
        const Middlewares: EvaluationFunc[] = [ transferMiddleware, missedPassengerMiddleware, 
            vehicleWaitingMiddleware, passengerWaitingMiddleware, passengerJourneyMiddleware ]; 

        for(let second = start; second < DAY && second < end; second++){
            const simulationFrame: SimulationFrame = {};
            results.frame[second] = {stationCongestion: {}, 
                vehicleCongestion: {}, passengerCongestion: {}}
    
            // Evaluate active vehicles and passengers
            const vehicles = Object.keys(this.simulationVehicles).reduce((accum, avID) => {
                const av = this.simulationVehicles[+avID];
                const f = av.Simulate(second, this.eventManager);
                if(f) { results.frame[second].vehicleCongestion[+avID] = f?.passengerCnt; }
                return { ...accum, ...(f? { [av.getID()] : f } :{} )}
            }, {});
            if(vehicles && vehicles !== {}){ simulationFrame.vehicles = vehicles; }

            const passengers = Object.keys(this.simulationPassengers).reduce((accum, apID) => {
                const ap = this.simulationPassengers[+apID];
                const f = ap.Simulate(second, this.eventManager);
                return { ...accum, ...(f? { [ap.getID()] : f } :{} )}
            }, {});
            if(passengers && passengers !== {}){ simulationFrame.passengers = passengers; }
            
            const stations = Object.keys(this.simulationStations).reduce((accum, asID) => {
                const as = this.simulationStations[+asID];
                const f = as.Simulate(second, this.eventManager);
                results.frame[second].stationCongestion[+asID] = f.passengerCnt;
                return { ...accum, ...(f? { [as.getID()] : f } :{} )}
            }, {});
            if(stations && stations !== {}){ simulationFrame.stations = stations; }
            

            // Aggregate data...
            frameContainer[second] = simulationFrame;
            results.frame[second].passengerCongestion = this.getCurrentPassengerCongestion(second);
            Middlewares.forEach((m: EvaluationFunc) => m(simulationFrame, this.eventManager));
            yield call([this, this.handlePassengerPaths]);

            // Remove expired events...
            this.eventManager.cleanup(second);
            if(second%100 === 0){
                yield put(SetBakedFrames(second - start));
                yield delay(50);
            }
        }

        results.vehicles = getVehicleWaiting();
        results.metrics.passengerTransfers = getPassengerTransfers();
        results.metrics.missedPassengers = getMissedPassengers();
        results.passenger = Object.keys(this.simulationPassengers).reduce((accum, pID) => ({
            ...accum, [+pID]:{
                journeyTimes: getPassengerJourney(+pID),
                timeWaiting: getPassengerWaiting(+pID),
        }}), {});

        return {
            frames: frameContainer,
            results: results
        }
    }

    getCurrentPassengerCongestion = (second: number): { [pID:number]: number } =>
        Object.keys(this.simulationPassengers).reduce((accum, pID) => {
            const p = this.simulationPassengers[+pID];
            if(second < p.getDeparture() || p.hasCompleted) return {...accum};

            const congestion = !p.isOnboardVehicle()? 1:
                this.simulationVehicles[p.getCurrentVehicle()].getCurrentPassengerCount();
            return { ...accum, ...{ [+pID]: congestion } };
        }, {});

    *handlePassengerPaths()
    {
        let events = this.eventManager.getEventsWithTag(PassengerEventTags[PassengerEventTags.PATH_CALCULATED]);
        for(let i = 0; i < events.length; i++){
            const obj = events[i].getObj();
            this.eventManager.deleteEvent(events[i].getID());
            if(isPassengerEventObj(obj)){
                if(obj.path && obj.alg) {
                    yield put(PushPassengerPath(obj.passengerID, { 
                        [obj.alg as number]: {
                            path: obj.path.path, 
                            isActive: obj.path.isActive
                        }
                    }));   
                }
            }
        }
    }
}

export default Simulator;