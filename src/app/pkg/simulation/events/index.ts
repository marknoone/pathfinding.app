import EventManager from './manager';

export default EventManager; 
export { default as Event } from './event';

export enum EventType {
    VEHICLE_EVENT = "@vehicle/",
    STATION_EVENT = "@station/",
    PASSENGER_EVENT = "@passenger/",
    EVALUATION_EVENT = "@evaluation/",
}


export interface SimulationEvent {
    getID: () => number 
    getObj: () => any 
    getTag: () => string
    getType: () => EventType
    getExpiry: () => number
    
    hasExpired: (time:number) => boolean
    emit: (newID: number) => SimulationEvent
}


