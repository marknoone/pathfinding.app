export type PassengerState = {
    count: number
    tree: {
        [k:number] : Passenger | PassengerDirectory
    }
}

export type PassengerAction = {
    type: string,
    payload: {
        id: number
        item?: Passenger | PassengerDirectory
    }
}

export enum PassengerActionTypes {
    UPDATE_PASSENGER_WITH_ID = "@passenger/UPDATE_PASSENGER_WITH_ID",
    ADD_PASSENGER_TO_DIRECTORY = "@passenger/ADD_PASSENGER_TO_DIRECTORY",
    DELETE_PASSENGER_FROM_SCENARIO = "@passenger/DELETE_PASSENGER_FROM_SCENARIO",
    
    UPDATE_DIRECTORY_WITH_ID = "@passengers/UPDATE_DIRECTORY_WITH_ID",
    ADD_DIRECTORY_TO_DIRECTORY = "@passenger/ADD_DIRECTORY_TO_DIRECTORY",
    DELETE_DIRECTORY_FROM_SCENARIO = "@passenger/DELETE_DIRECTORY_FROM_SCENARIO",
}

export type PassengerDirectory = {
    id: number
    name: string
    children: number[]

    isCollapsed: boolean
    isHovering: boolean
}

export type Passenger = {
    id: number
    name: string
    start: string
    destination: string
    tod: number
    
    isHovering: boolean
}
