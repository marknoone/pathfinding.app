import { EvaluationFunc } from ".";
import { SimulationFrame } from "../";
import { SimulationEvent } from "../events";
import { EventType } from "../events";
import EventManager from "../events/manager";
import { PassengerEventTags, isPassengerEventObj, PassengerEventObj } from "../events/passenger";

type PassengerTimeWaitingCounterObj = { predicted: number[][], actual: number[][], tod: number }
const PassengerWaitingTimeCounterMiddleware = (): [EvaluationFunc, (pID: number) => PassengerTimeWaitingCounterObj] => {
    const passengerTimes: {[pID: number]: PassengerTimeWaitingCounterObj} = {};
    let passengerTimers: {[pID: number]: { stop:number, time: number}} = {};

    return [
        (f: SimulationFrame, em: EventManager) => {
            em.getEventsWithTag(PassengerEventTags[PassengerEventTags.ARRIVED_AT_STOP_EVENT])
                .filter((e:SimulationEvent) => 
                    e.getType() === EventType.PASSENGER_EVENT && isPassengerEventObj(e.getObj())
                ).forEach((e:SimulationEvent) => {
                    const newTimers: typeof passengerTimers = {};
                    const obj = e.getObj() as PassengerEventObj;
                    if(obj.stopID) {
                        if(!passengerTimers[obj.passengerID]){
                            newTimers[obj.passengerID] = { time: 0, stop: obj.stopID };
                        } else {
                            newTimers[obj.passengerID] = {
                                stop: passengerTimers[obj.passengerID].stop,
                                time: passengerTimers[obj.passengerID].time + 1
                            };
                            delete passengerTimers[obj.passengerID];
                        }
                    }

                    // Push old timers to passenger times...
                    Object.keys(passengerTimers).forEach(pID => {
                        passengerTimes[+pID].actual.push([
                            passengerTimers[+pID].stop,
                            passengerTimers[+pID].time   
                        ])
                    })

                    passengerTimers = {...newTimers};
                })

            // Initiate new passengers
            em.getEventsWithTag(PassengerEventTags[PassengerEventTags.PATH_CALCULATED])
                .filter((e:SimulationEvent) => 
                    e.getType() === EventType.PASSENGER_EVENT && isPassengerEventObj(e.getObj())
                ).forEach((e:SimulationEvent) => {
                    const obj = e.getObj() as PassengerEventObj;
                    if(obj.path && obj.path.isActive && obj.tod)
                        passengerTimes[obj.passengerID] = {
                            predicted: obj.path.path.timeWaiting, 
                            tod: obj.tod,
                            actual: [], 
                        }
                });

        }, 
        (pID: number) => passengerTimes[pID]
    ];
}

export default PassengerWaitingTimeCounterMiddleware;