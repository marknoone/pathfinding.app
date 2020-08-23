import { Queue } from "../queues";
import { Coord } from ".";

class ActiveStation {
    ID: number
    coord: Coord
    nodeID: number
    routeQs: {[routeID: number]: Queue<number>}

    constructor(id: number, c: Coord, node: number){
        this.ID = id;
        this.coord = c;
        this.routeQs = {};
        this.nodeID = node;
    }

    // Inline Funcs
    addRoute = (rID: number) => 
        this.routeQs[rID] = new Queue<number>();

    containsRoute = (rID: number):boolean => 
        Object.keys(this.routeQs).includes(rID.toString())


    // QueueMethods
    getPassengerAtStop(rID: number):(number|null){ 
        if(!this.containsRoute(rID))
            return null;
            
        return this.routeQs[rID].Dequeue();
    }

    queueAtStation(rID:number, pID: number) {
        if(this.containsRoute(rID))
            this.routeQs[rID].Enqueue(pID);
    }


    
    // Getters/Setters....
    getID = ():number => this.ID;
    getCoords = ():Coord => this.coord;
    getNodeID = ():number => this.nodeID;

    getPassengersWaitingForRoute(rID:number):number {
        if(this.containsRoute(rID))
            return this.routeQs[rID].Size();
        else 
            return -1
    }

    getCurrentPassengerCnt = ():number =>
        Object.keys(this.routeQs).reduce((accum, r) => 
            accum + this.routeQs[+r].Size(), 0);
}

export default ActiveStation;