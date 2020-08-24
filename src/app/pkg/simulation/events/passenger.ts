import { EventType } from "."

export enum PassengerEventTags {
    BOARDING_EVENT = EventType.PASSENGER_EVENT + "BOARDING",
    ALIGHT_EVENT = EventType.PASSENGER_EVENT + "ALIGHT",
    ARRIVED_AT_STOP_EVENT = EventType.PASSENGER_EVENT + "ARRIVED_AT_STOP",
}

export function isPassengerEventObj(obj: any): obj is PassengerEventObj {
    return (
        (obj as PassengerEventObj).stopID !== undefined ||
        (obj as PassengerEventObj).routeID !== undefined ||
        (obj as PassengerEventObj).passengerID !== undefined
    );
}

export type PassengerEventObj ={
    stopID: number,
    routeID: number,
    passengerID: number,
    vehicleID?: number,
}