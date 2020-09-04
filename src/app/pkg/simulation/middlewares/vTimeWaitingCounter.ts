import { EvaluationFunc } from ".";
import { SimulationFrame } from "../";
import EventManager from "../events/manager";
import { SimulationEvent, EventType } from "../events";
import { VehicleEventTags, isVehicleEventObj, VehicleEventObj } from "../events/vehicle";

type VehicleTimeWaitingCounterObj = { [vID: number]: number[][] } // [sID, timeWaiting]
const VehicleWaitingTimeCounterMiddleware = (): [EvaluationFunc, () => VehicleTimeWaitingCounterObj] => {
    const vehicles: VehicleTimeWaitingCounterObj = {}
    const vehicleTimers: { [vID: number]: number } = {}
    const iterateTimers = () => 
        Object.keys(vehicleTimers).forEach( t =>
            vehicleTimers[+t] = vehicleTimers[+t] + 1);


    return [
        (f: SimulationFrame, em: EventManager) => {
            // cancel any timers for departing vehicles and push to final result.
            em.getEventsWithTag(VehicleEventTags[VehicleEventTags.DEPARTING_STOP])
                .filter((e:SimulationEvent) => 
                    e.getType() === EventType.VEHICLE_EVENT && isVehicleEventObj(e.getObj())
                ).forEach((e:SimulationEvent) => {
                    const obj = e.getObj() as VehicleEventObj;
                    if(vehicleTimers[obj.vehicleID]) {
                        vehicles[obj.vehicleID].push([obj.stopID, vehicleTimers[obj.vehicleID]])
                        delete vehicleTimers[obj.vehicleID];
                    }

                })
                
            // Execute before handling new 
            // arrival events to not give extra time.
            iterateTimers();

            // Iterate over all vehcile arrival events and begin timers...
            em.getEventsWithTag(VehicleEventTags[VehicleEventTags.ARRIVED_AT_STOP_EVENT])
                .filter((e:SimulationEvent) => 
                    e.getType() === EventType.VEHICLE_EVENT && isVehicleEventObj(e.getObj())
                ).forEach((e:SimulationEvent) => {
                    const obj = e.getObj() as VehicleEventObj;
                    if(!vehicles[obj.vehicleID]) { vehicles[obj.vehicleID] = [] }
                    vehicleTimers[obj.vehicleID] = 0;
                })
        }, 
        () => vehicles
    ];
}

export default VehicleWaitingTimeCounterMiddleware;