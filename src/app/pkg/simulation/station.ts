import { Coord, StationFrame } from ".";
import EventManager, { SimulationEvent } from "./events"
import { PassengerEventTags, isPassengerEventObj } from "./events/passenger";

class ActiveStation {
    ID: number
    coord: Coord
    nodeID: number
    routeCnt: {[rID:number]: Set<number>}

    constructor(id: number, c: Coord, node: number){
        this.ID = id;
        this.coord = c;
        this.nodeID = node;
        this.routeCnt = {};
    }
    
    getID = ():number => this.ID;
    getCoords = ():Coord => this.coord;
    getNodeID = ():number => this.nodeID;
    addRouteWatch = (rID: number) => this.routeCnt[rID] = new Set<number>(); 

    Simulate(_: number, eventManager: EventManager): StationFrame {
        // Increment stop counts for stop and routes...
        eventManager.getEventsWithTag(
            PassengerEventTags[PassengerEventTags.ARRIVED_AT_STOP_EVENT]
        ).forEach((e:SimulationEvent) => {
            const pObj = e.getObj()
            if(isPassengerEventObj(pObj) && pObj.stopID === this.ID){
                if(
                    Object.keys(this.routeCnt).includes(pObj.routeID!.toString())
                    && !this.routeCnt[pObj.routeID!].has(pObj.passengerID)
                )
                    this.routeCnt[pObj.routeID!].add(pObj.passengerID);
            }
        });
            
        // Decrement stop counts for stop and routes...
        eventManager.getEventsWithTag(
            PassengerEventTags[PassengerEventTags.BOARDING_EVENT]
        ).forEach((e:SimulationEvent) => {
            const pObj = e.getObj();
            if(isPassengerEventObj(pObj) && pObj.stopID === this.ID){
                if(
                    Object.keys(this.routeCnt).includes(pObj.routeID!.toString())
                    && this.routeCnt[pObj.routeID!].has(pObj.passengerID)
                )
                    this.routeCnt[pObj.routeID!].delete(pObj.passengerID);
            }
        });

        return {
            passengerCnt: Object.keys(this.routeCnt).reduce((accum, cnt) => 
                accum + this.routeCnt[+cnt].size, 0
            ),
            passengerCntByRoute: Object.keys(this.routeCnt).reduce((accum, route) => 
            ({ ...accum, ... { [+route]: this.routeCnt[+route].size }}), {})
        };
    }   
}

export default ActiveStation;