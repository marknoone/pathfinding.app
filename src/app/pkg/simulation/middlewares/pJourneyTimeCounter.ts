import { EvaluationFunc } from ".";
import { SimulationFrame } from "..";
import EventManager from "../events/manager";
import { PassengerEventTags, isPassengerEventObj, PassengerEventObj } from "../events/passenger";
import { SimulationEvent, EventType } from "../events";

type PassengerJourneyTimeCounterObj = { predicted: number, actual: number, tod: number }
const PassengerJourneyTimeCounterMiddleware = (): [EvaluationFunc, (pID: number) => PassengerJourneyTimeCounterObj] => {
    const passengerTimes: {[pID: number]: PassengerJourneyTimeCounterObj} = {};
    const passengerTimers: {[pID: number]: number} = {};
    const iterateTimers = () => 
        Object.keys(passengerTimers).forEach( t =>
            passengerTimers[+t] = passengerTimers[+t] + 1);
    
    return [
        (f: SimulationFrame, em: EventManager) => {
            // cancel any timers for departing vehicles and push to final result.
            em.getEventsWithTag(PassengerEventTags[PassengerEventTags.COMPLETED_JOURNEY])
                .filter((e:SimulationEvent) => 
                    e.getType() === EventType.PASSENGER_EVENT && isPassengerEventObj(e.getObj())
                ).forEach((e:SimulationEvent) => {
                    const obj = e.getObj() as PassengerEventObj;
                    if(passengerTimers[obj.passengerID]) {
                        passengerTimes[obj.passengerID].actual = passengerTimers[obj.passengerID]
                        delete passengerTimers[obj.passengerID];
                    }

                })

            // Execute before handling new 
            // arrival events to not give extra time.
            iterateTimers();

            // Initiate new passengers
            em.getEventsWithTag(PassengerEventTags[PassengerEventTags.PATH_CALCULATED])
                .filter((e:SimulationEvent) => 
                    e.getType() === EventType.PASSENGER_EVENT && isPassengerEventObj(e.getObj())
                ).forEach((e:SimulationEvent) => {
                    const obj = e.getObj() as PassengerEventObj;
                    if(obj.path && obj.path.isActive && obj.tod){
                        passengerTimers[obj.passengerID] = 0;
                        passengerTimes[obj.passengerID] = {
                            predicted: obj.path.path.totalTime, 
                            tod: obj.tod,
                            actual: 0, 
                        }
                    }
                });
        }, 
        (pID: number) => passengerTimes[pID]
    ];
}

export default PassengerJourneyTimeCounterMiddleware;