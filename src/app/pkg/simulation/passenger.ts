import { Path } from "."
import Graph from "./graph";
import { PassengerFrame, Coord } from "."
import EventManager from "./events"
import { PathfindingAlg } from "./algorithms"
import { Algorithms } 
    from "../../../editor/components/rightPanel/components/simulationView/constants"

class ActivePassenger {
    ID: number
    to: number
    from: number
    departing: number
    lastStatusChg: number
    hasCompleted: boolean
    status: "TRAVELLING" | "WAITING" | "INACTIVE"

    path: (Path | null)
    coords: Coord

    constructor(id: number, to: number, from: number, d: number){
        this.ID = id;
        this.departing = d;
        this.lastStatusChg = 0;
        this.status = "INACTIVE";
        this.hasCompleted = false;
        this.coords = {x: 0, y: 0};
        
        // Path properties
        this.to = to;
        this.from = from;
        this.path = null;
    }

    computePath(g:Graph):Path {
        return [];
    }

    Simulate(simClock: number, eventManager: EventManager): (PassengerFrame | null) {
        if(this.hasCompleted) return null;

        return null;
    }

    // Getters / setters
    getID = ():number => this.ID;
}

export default ActivePassenger;