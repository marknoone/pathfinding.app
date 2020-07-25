export type StationDataObj = {[key: number]: Station}
export type RouteDataObj   = {[key: number]: Route}
export type VehicleDataObj = {[key: number]: Vehicle}

export type StationsState = { nextIdx: number, data: StationDataObj }
export type RoutesState =   { nextIdx: number, data: RouteDataObj   }
export type VehiclesState = { nextIdx: number, data: VehicleDataObj }

export type StationAction = { type: string; payload: { id: number, obj?: Station } }
export type RouteAction =   { type: string; payload: { id: number, obj?: Route } }
export type VehicleAction = { type: string; payload: { id: number, obj?: Vehicle } }

export enum VehicleActionTypes {  
    ADD_NEW_VEHICLE = "@@vehicle/ADD_NEW_VEHICLE",
    DELETE_VEHICLE = "@@vehicle/DELETE_VEHICLE",
    UPDATE_VEHICLE = "@@vehicle/UPDATE_VEHICLE"
}

export enum StationActionTypes {  
    ADD_NEW_STATION = "@@station/ADD_NEW_STATION",
    DELETE_STATION = "@@station/DELETE_STATION",
    UPDATE_STATION = "@@station/UPDATE_STATION"
}

export enum RouteActionTypes {  
    ADD_NEW_ROUTE = "@@route/ADD_NEW_ROUTE",
    DELETE_ROUTE = "@@route/DELETE_ROUTE",
    UPDATE_ROUTE = "@@route/UPDATE_ROUTE"
}

export type Station = {
    id: number
    name: string
    colour: string
    nodeID: number
}

export type Route = {
    id: number
    name: string
    mode: TransitModes
    color: string

    stations: number[]
    departures: number[]
}

export type Vehicle = {
    id: number
    capacity: number
    glyph: string
}

export enum TransitModes {
    FOOT    = "FOOT",
    BUS     = "BUS",
    TRAIN   = "TRAIN",
    TRAM    = "TRAM",
}


