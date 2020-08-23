import { SimulationEvent, EventType } from ".";

export type EventStore = {
    [eID: number]: SimulationEvent 
};

class EventManager {
    eventIdx: number
    events: EventStore
    
    constructor(){
        this.events = {};
        this.eventIdx = 0;
    }

    cleanup = (time:number) =>
        this.events = Object.keys(this.events).reduce((accum, k) => ({
            ...accum,
            ...(!this.events[+k].hasExpired(time) && this.events[+k])
        }), {});

    emitEvent = (e: SimulationEvent) => 
        this.events[this.eventIdx++] = e;
    
    getEvents = (): EventStore => this.events
    
    getEvent(eventID: number):(SimulationEvent | null){
        const e = Object.keys(this.events)
            .find((k:string) => this.events[+k].getID() === eventID);
        if(e)
            return this.events[+e];
        else 
            return null 
    }
    
    deleteEvent = (eventID: number) => delete this.events[eventID];

    getEventsOfType = (type: EventType): SimulationEvent[] => 
        Object.keys(this.events)
            .filter((k:string) => this.events[+k].getType() === type)
            .map((k:string) => this.events[+k]);

    getEventsWithTag = (tag: string): SimulationEvent[] => 
        Object.keys(this.events)
            .filter((k:string) => this.events[+k].getTag() === tag)
            .map((k:string) => this.events[+k]);
}

export default EventManager;