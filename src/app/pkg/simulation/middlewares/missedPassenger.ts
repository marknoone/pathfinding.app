import { EvaluationFunc } from ".";
import { SimulationFrame } from "..";
import EventManager from "../events/manager";
import { SimulationEvent } from "../events";
import { VehicleEventTags, isVehicleEventObj } from "../events/vehicle";

const PassengerTransfersMiddleware = (): [EvaluationFunc, () => number] => {
    var missedPassengers: number = 0;

    return [
        (f: SimulationFrame, e: EventManager) => {
            let events = e.getEventsWithTag(VehicleEventTags[VehicleEventTags.MISSED_PASSENGERS]);
            events.forEach((e:SimulationEvent) => {
                let obj = e.getObj();
                if(isVehicleEventObj(obj))
                    missedPassengers += obj.missedPassengers? obj.missedPassengers:0;
            });

        }, 
        () => missedPassengers
    ];
}

export default PassengerTransfersMiddleware;