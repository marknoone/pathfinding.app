import { EventType } from "."

export enum PassengerEventTags {
    BOARDING_EVENT = EventType.PASSENGER_EVENT + "BOARDING",
    ALIGHT_EVENT = EventType.PASSENGER_EVENT + "ALIGHT",
    ARRIVED_AT_STOP_EVENT = EventType.PASSENGER_EVENT + "ARRIVED_AT_STOP",
}

export function isPassengerEventObj(obj: any): obj is PassengerEventObj {
    return (obj as PassengerEventObj).__isPassengerEventObj !== undefined;
}

export type PassengerEventObj = {
    __isPassengerEventObj: null,
    stopID: number,
    routeID: number,
    passengerID: number,
    vehicleID?: number,
}


export const passengerEventObj = (
    stopID: number, 
    routeID: number, 
    passengerID: number, 
    vehicleID?: number
):PassengerEventObj =>
    ({ 
        __isPassengerEventObj: null, 
        stopID: stopID, 
        routeID: routeID,
        passengerID: passengerID, 
        vehicleID: vehicleID 
});