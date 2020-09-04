import { Coord, StationFrame } from ".";
import EventManager, { SimulationEvent, EventType } from "./events"
import { PassengerEventTags, isPassengerEventObj } from "./events/passenger";

class ActiveStation {
    ID: number
    coord: Coord
    nodeID: number

    constructor(id: number, c: Coord, node: number){
        this.ID = id;
        this.coord = c;
        this.nodeID = node;
    }
    
    getID = ():number => this.ID;
    getCoords = ():Coord => this.coord;
    getNodeID = ():number => this.nodeID;

    Simulate(_: number, eventManager: EventManager): StationFrame {
        // Increment stop counts for stop and routes...
        const passengers = eventManager.getEventsWithTag(
            PassengerEventTags[PassengerEventTags.ARRIVED_AT_STOP_EVENT]
        ).filter((e:SimulationEvent) => 
             e.getType() === EventType.PASSENGER_EVENT && 
             e.getObj().stopID! === this.ID
        ).map((e:SimulationEvent) => e);

        return { passengerCnt: passengers.length };
    }   
}

export default ActiveStation;