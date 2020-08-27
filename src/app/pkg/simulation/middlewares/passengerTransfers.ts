import { EvaluationFunc } from ".";
import { SimulationFrame } from "../";
import EventManager from "../events/manager";
import { PassengerEventTags, isPassengerEventObj } from "../events/passenger";
import { SimulationEvent } from "../events";

const PassengerTransfersMiddleware = (): [EvaluationFunc, () => number] => {
    var transfers: {[pID:number] : number} = {};

    return [
        (f: SimulationFrame, e: EventManager) => {
            let events = 
                e.getEventsWithTag(PassengerEventTags[PassengerEventTags.BOARDING_EVENT]);
            events.forEach((e:SimulationEvent) => {
                let obj = e.getObj();
                if(isPassengerEventObj(obj)){
                    if(!transfers[obj.passengerID])
                        transfers[obj.passengerID] = 0;

                    transfers[obj.passengerID] += 1;
                }
            });

        }, 
        () => Object.keys(transfers).reduce((accum, pID) => accum + transfers[+pID], 0)
    ];
}

export default PassengerTransfersMiddleware;