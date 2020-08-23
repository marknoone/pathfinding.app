import EventManager from './manager';
export default EventManager; 


export enum EventType {
    PASSENGER_EVENT = "@passenger/",
    VEHICLE_EVENT = "@vehicle/",
    EVALUATION_EVENT = "@evaluation/",
    STATION_EVENT = "@station/",
}


export interface SimulationEvent {
    getID: () => number 
    getObj: () => any 
    getTag: () => string
    getType: () => EventType
    
    hasExpired: (time:number) => boolean
    emit: (newID: number) => SimulationEvent
}


