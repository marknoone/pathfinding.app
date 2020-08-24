import { EventType, SimulationEvent } from ".";
import { Coord } from "..";
import EventManager from "./manager";

export enum VehicleEventTags {
    SERVICE_START = EventType.VEHICLE_EVENT + "SERVICE_START",
    SERVICE_END = EventType.VEHICLE_EVENT + "SERVICE_END",
    NEW_POSITION = EventType.VEHICLE_EVENT + "NEW_POSITION",
    DEPARTING_STOP = EventType.VEHICLE_EVENT + "DEPARTING_STOP",
    ARRIVED_AT_STOP_EVENT = EventType.VEHICLE_EVENT + "ARRIVED_AT_STOP",
}

export function isVehicleEventObj(obj: any): obj is VehicleEventObj {
    return (obj as VehicleEventObj).__isVehicleObj !== undefined;
}

export type VehicleEventObj = {
    __isVehicleObj: null,
    stopID: number, 
    routeID: number, 
    vehicleID: number,
    coordinates?: Coord
}

export const vehicleEventObj = (
    stopID: number, 
    routeID: number, 
    vehicleID: number, 
    coordinates?: Coord
): VehicleEventObj =>
    ({ 
        __isVehicleObj: null, 
        stopID: stopID, 
        routeID: routeID, 
        vehicleID: vehicleID, 
        coordinates: coordinates 
});

export const getVehicleCoordChange = (vID: number, eventManager:EventManager):(Coord | null) => {
    if(vID < 0) return null;
    const e = eventManager.getEventsWithTag(VehicleEventTags[VehicleEventTags.NEW_POSITION])
        .find((e:SimulationEvent) => {
            const vObj = e.getObj();
            if(!isVehicleEventObj(vObj)) return false;
                return vObj.vehicleID === vID;
        });
    
    if(e){
        const c = (<VehicleEventObj>e.getObj()).coordinates
        return c? c: null
    }
    return null;
}
