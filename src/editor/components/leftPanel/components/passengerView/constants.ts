export type PassengerState = {
    nextId: number
    tree: PassengerTree
}

export type PassengerTree = { [k:number] : Passenger | PassengerDirectory }

export type PassengerAction = {
    type: string,
    payload: {
        id: number,
        lock?: boolean
        item?: Passenger | PassengerDirectory
    }
}

export enum PassengerActionTypes {
    UPDATE_PASSENGER_WITH_ID = "@@passenger/UPDATE_PASSENGER_WITH_ID",
    ADD_EMPTY_PASSENGER_TO_DIRECTORY = "@@passenger/ADD_EMPTY_PASSENGER_TO_DIRECTORY",
    ADD_PASSENGER_TO_DIRECTORY = "@@passenger/ADD_PASSENGER_TO_DIRECTORY",
    DELETE_PASSENGER_FROM_SCENARIO = "@@passenger/DELETE_PASSENGER_FROM_SCENARIO",
    SET_PASSENGER_LOCK_BY_ID = "@@passenger/SET_PASSENGER_LOCK_BY_ID",
    
    UPDATE_DIRECTORY_WITH_ID = "@@passenger/UPDATE_DIRECTORY_WITH_ID",
    ADD_EMPTY_DIRECTORY_TO_DIRECTORY = "@@passenger/ADD_EMPTY_DIRECTORY_TO_DIRECTORY",
    ADD_DIRECTORY_TO_DIRECTORY = "@@passenger/ADD_DIRECTORY_TO_DIRECTORY",
    DELETE_DIRECTORY_FROM_SCENARIO = "@@passenger/DELETE_DIRECTORY_FROM_SCENARIO",
}

export type PassengerDirectory = {
    id: number
    name: string
    children: number[]
}

export type Passenger = {
    id: number
    name: string
    tod: number
    start: {x: number, y: number}
    destination: {x: number, y: number}
    isLocked: boolean
}

export function isPassenger(p: Passenger | PassengerDirectory): p is Passenger {
    return (p as Passenger).start !== undefined;
}

export function isPassengerDirectory(p: Passenger | PassengerDirectory): p is PassengerDirectory {
    return (p as PassengerDirectory).children !== undefined;
}
