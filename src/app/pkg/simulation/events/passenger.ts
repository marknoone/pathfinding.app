import { EventType } from "."
import { Algorithms } 
    from "../../../../editor/components/rightPanel/components/simulationView/constants";
import { Path } from "..";

export enum PassengerEventTags {
    ALIGHT_EVENT = EventType.PASSENGER_EVENT + "ALIGHT",
    BOARDING_EVENT = EventType.PASSENGER_EVENT + "BOARDING",
    PATH_CALCULATED = EventType.PASSENGER_EVENT + "PATH_CALCULATED",
    ARRIVED_AT_STOP_EVENT = EventType.PASSENGER_EVENT + "ARRIVED_AT_STOP",
}

export function isPassengerEventObj(obj: any): obj is PassengerEventObj {
    return (obj as PassengerEventObj).__isPassengerEventObj !== undefined;
}

export type PassengerEventObj = {
    __isPassengerEventObj: null,
    passengerID: number,
    stopID?: number,
    routeID?: number,
    vehicleID?: number,
    alg?: Algorithms,
    path?: EventPath
}

type EventPath = { path: Path, isActive: boolean }
type NamedParams = {
    passengerID: number, 
    stopID?: number, 
    routeID?: number, 
    vehicleID?: number,
    alg?: Algorithms,
    eventPath?: EventPath
}

export const passengerEventObj = ({
    passengerID, 
    stopID, 
    routeID, 
    vehicleID,
    alg,
    eventPath
}: NamedParams):PassengerEventObj =>
    ({ 
        __isPassengerEventObj: null, 
        stopID: stopID, 
        routeID: routeID,
        passengerID: passengerID, 
        vehicleID: vehicleID,
        alg: alg,
        path: eventPath
});