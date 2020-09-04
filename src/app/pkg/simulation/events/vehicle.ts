import { EventType, SimulationEvent } from ".";
import { Coord } from "..";
import EventManager from "./manager";

export enum VehicleEventTags {
    SERVICE_START = EventType.VEHICLE_EVENT + "SERVICE_START",
    MISSED_PASSENGERS = EventType.VEHICLE_EVENT + "MISSED_PASSENGERS",
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
    currentCapacity: number,
    currentPassengers: number,

    coordinates?: Coord
    missedPassengers?: number,
}

export const vehicleEventObj = (p: {
    stopID: number, 
    routeID: number, 
    vehicleID: number, 
    coordinates?: Coord,
    missedPassengers?: number
    currentCapacity: number
    currentPassengers: number
}): VehicleEventObj =>
    ({ 
        __isVehicleObj: null, 
        stopID: p.stopID, 
        routeID: p.routeID, 
        vehicleID: p.vehicleID, 
        coordinates: p.coordinates,
        missedPassengers: p.missedPassengers,
        currentCapacity: p.currentCapacity,
        currentPassengers: p.currentPassengers,
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
        const c = (e.getObj() as VehicleEventObj).coordinates
        return c? c: null
    }
    return null;
}
