import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export type StationDataObj = {[key: number]: Station}
export type RouteDataObj   = {[key: number]: Route}
export type VehicleDataObj = {[key: number]: Vehicle}

export type StationsState = { nextId: number, data: StationDataObj }
export type RoutesState =   { nextId: number, data: RouteDataObj   }
export type VehiclesState = { nextId: number, data: VehicleDataObj }

export type StationAction = { type: string; payload: { id: number, obj?: Station } }
export type RouteAction =   { type: string; payload: { id: number, obj?: Route } }
export type VehicleAction = { type: string; payload: { id: number, obj?: Vehicle } }

export enum VehicleActionTypes {  
    ADD_NEW_EMPTY_VEHICLE = "@@vehicle/ADD_NEW_EMPTY_VEHICLE",
    ADD_NEW_VEHICLE = "@@vehicle/ADD_NEW_VEHICLE",
    DELETE_VEHICLE = "@@vehicle/DELETE_VEHICLE",
    UPDATE_VEHICLE = "@@vehicle/UPDATE_VEHICLE"
}

export enum StationActionTypes {  
    ADD_NEW_EMPTY_STATION = "@@station/ADD_NEW_EMPTY_STATION",
    ADD_NEW_STATION = "@@station/ADD_NEW_STATION",
    DELETE_STATION = "@@station/DELETE_STATION",
    UPDATE_STATION = "@@station/UPDATE_STATION"
}

export enum RouteActionTypes {  
    ADD_NEW_EMPTY_ROUTE = "@@route/ADD_NEW_EMPTY_ROUTE",
    ADD_NEW_ROUTE = "@@route/ADD_NEW_ROUTE",
    DELETE_ROUTE = "@@route/DELETE_ROUTE",
    UPDATE_ROUTE = "@@route/UPDATE_ROUTE"
}

export enum Colours {
    JIGGLYPUFF = "#ff9ff3",      LOTUS_PINK = "#f368e0",       JADE_DUST = "#00d2d3",           
    AQUA_VELVET = "#01a3a4",     CASANDRA_YELLOW = "#feca57",  DRAGON_SKIN = "#ff9f43",      
    JOUST_BLUE = "#54a0ff",      BLEU_DE_FRANCE = "#2e86de",   PASTEL_RED = "#ff6b6b",      
    AMOUR = "#ee5253",           NASU_PURPLE = "#5f27cd",      BLUEBELL = "#341f97",
    MEGAMAN = "#48dbfb",         CYANITE = "#0abde3",          LIGHT_BLUE_BALLERINA = "#c8d6e5", 
    STORM_PETREL = "#8395a7",    CARRIBEAN_GREEN = "#1dd1a1",  MOUNTAIN_MEADOW = "#10ac84",  
    FUEL_TOWN = "#576574",       IMPERIAL_PRIMER = "#222f3e",
}

export const ColourSet = [
    { s: "JigglyPuff", value: Colours.JIGGLYPUFF },    { s: "Lotus Pink", value: Colours.LOTUS_PINK },            { s:"Jade Dust", value: Colours.JADE_DUST }, 
    { s: "Aqua Velvet", value: Colours.AQUA_VELVET },  { s: "Casandra Yellow", value: Colours.CASANDRA_YELLOW },  { s:"Dragon Skin", value: Colours.DRAGON_SKIN }, 
    { s: "Joust Blue", value: Colours.JOUST_BLUE },    { s: "Bleu De France", value: Colours.BLEU_DE_FRANCE },    { s:"Pastel Red", value: Colours.PASTEL_RED }, 
    { s: "Amour", value: Colours.AMOUR },              { s: "Nasu Purple", value: Colours.NASU_PURPLE },          { s:"Bluebell", value: Colours.BLUEBELL }, 
    { s: "Megaman", value: Colours.MEGAMAN },          { s: "Cyanite", value: Colours.CYANITE },                  { s:"Light Blue Ballerina", value: Colours.LIGHT_BLUE_BALLERINA }, 
    { s: "Storm Petal", value: Colours.STORM_PETREL }, { s: "Carribean Green", value: Colours.CARRIBEAN_GREEN },  { s:"Mountain Meadow", value: Colours.MOUNTAIN_MEADOW }, 
    { s: "Fuel Town", value: Colours.FUEL_TOWN },      { s: "Imperial Primer", value: Colours.IMPERIAL_PRIMER }
];

export type TimestampSelection = {
    name: string
    value: number
}

export type Station = {
    id: number
    name: string
    coordinates: {
        x: number,
        y: number,
    }
}

export type Route = {
    id: number
    name: string
    mode: TransitModes
    color: Colours

    stations: { [order: number]: number }
    departures: { [order: number]: TimestampSelection }
}

export type Vehicle = {
    id: number
    name: string
    capacity: number
    glyph: IconDefinition
}

export enum TransitModes {
    FOOT    = "FOOT",
    BUS     = "BUS",
    TRAIN   = "TRAIN",
    TRAM    = "TRAM",
}

export const TransitOptions = [   
    { s: "Bus",   value: TransitModes.BUS },    
    { s: "Train", value: TransitModes.TRAIN },    
    { s: "Tram",  value: TransitModes.TRAM },    
];


