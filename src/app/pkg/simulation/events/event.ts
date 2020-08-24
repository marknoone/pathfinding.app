import { EventType, SimulationEvent } from '.';

class Event implements SimulationEvent {
    obj: any
    id: number
    tag: string
    expires: number
    type: EventType

    constructor(tag: string, expires: number, obj: any){
        this.id = -1; // Set by event manager
        this.expires = expires;
        this.obj = obj;
        this.tag = tag;
        this.type = EventType.PASSENGER_EVENT
    }

    emit(newID: number): SimulationEvent{
        this.id = newID;
        return this;
    }

    hasExpired = (time:number) => 
        this.expires - time <= 0
    
    getID = () => this.id;
    getObj = () => this.obj; 
    getTag = () => this.tag;
    getType = () => this.type;
}

export default Event; 