import { Route, StationDataObj } from "../../../editor/components/leftPanel/components/componentView/constants"
import { Coord, VehicleFrame, StationQueues } from "."
import { isBetween } from './geometry';

  class ActiveVehicle {
    // consts
    readonly ID: number
    readonly vehicleSpeed: number
    readonly passengers: Set<number>
    readonly stopTime: number

    // Mutable properties
    activeSince: number
    hasCompleted: boolean
    status: "INACTIVE" | "STOPPED" | "INTRANSIT"
    lastStatusChg: number
    angle: number
    coords: Coord
    
    // Route based properties...
    routeID: number
    departing: number
    vehicleType: number
    currentStationIdx: number
    travellingStations: number[]
    

    constructor(id: number, r: Route, spd: number, depTime: number, stopTime: number){
        this.ID = id;
        this.angle = 0;
        this.activeSince = 0;
        this.lastStatusChg = 0;
        this.stopTime = stopTime;
        this.status = "INACTIVE";
        this.hasCompleted = false;
        this.coords = { x: 0, y: 0 }
        this.vehicleSpeed = spd;
        this.passengers = new Set<number>();
        
        // Route properties
        this.routeID = r.id;
        this.departing = depTime;
        this.currentStationIdx = 0;
        this.vehicleType = r.vehicleID;
        this.travellingStations = 
            Object.keys(r.stations).map(k => r.stations[+k].id); 
    }
    
    // Getters & Setters
    getID = ():number => this.ID;
    getAngle = ():number => this.angle;
    getCoords = ():Coord => this.coords;
    getCurrentPassengerCount = ():number => this.passengers.size;

    getVehicleFrame = ():VehicleFrame => ({
        angle: this.angle, 
        coordinate: this.coords,
        passengerCnt: this.passengers.size
    })

    getPrevStationID = ():(number|null) => 
        this.currentStationIdx > 1?
            this.travellingStations[this.currentStationIdx-1]:null;
    
    getNextStationID = ():(number|null) => 
        this.currentStationIdx < this.travellingStations.length-1?
            this.travellingStations[this.currentStationIdx+1]:null;

    getCurrentStationID = ():(number|null) => 
        this.currentStationIdx >= 0 &&
        this.currentStationIdx < this.travellingStations.length?
            this.travellingStations[this.currentStationIdx]: null;

    // Main simulation method. 
    // Returns null if vehicle is inactive.
    Simulate(simClock: number, s: StationDataObj, stns: StationQueues):( VehicleFrame | null ) {
        // Startup vehicle...
        if(this.hasCompleted) return null;
        else if(this.status === 'INACTIVE' && simClock === this.departing){
            this.status = 'STOPPED';
            this.lastStatusChg = simClock;
            this.activeSince = simClock;
            this.currentStationIdx = 0;
            this.coords = 
                s[this.travellingStations[this.currentStationIdx]].coordinates;
        }
        else if(this.status === 'INACTIVE') return null;
        
        // Simulate ...
        const currStn = this.getCurrentStationID();
        if(!currStn) { console.log(`Vehicle ${this.ID} has no current station`); return null; }
        switch(this.status) {
            case 'STOPPED':
                const stoppedFor = simClock - this.lastStatusChg;
                if(stns[this.routeID][currStn].IsEmpty()){
                    const nextStn = this.getNextStationID();
                    if(!nextStn){
                        this.hasCompleted = true; 
                        this.status = 'INACTIVE';
                    } else {
                        this.currentStationIdx += 1;
                        this.status = 'INTRANSIT';
                    }
                    this.lastStatusChg = simClock;
                } else if(stoppedFor % this.stopTime === 0){
                    const p = stns[this.routeID][currStn].Dequeue();
                    if(p) this.passengers.add(p); 
                }
                break;
            case 'INTRANSIT':
                const v = [
                    s[currStn].coordinates.x - this.coords.x,
                    s[currStn].coordinates.y - this.coords.y,
                ];
                const vLen = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
                const vNorm = [v[0]/vLen, v[1]/vLen];

                // speed * time = distance, but time is 1 second in this case.
                let coordinate: Coord = {
                    x: this.coords.x +  this.vehicleSpeed * vNorm[0], 
                    y: this.coords.y +  this.vehicleSpeed * vNorm[0]
                }

                const prevStn = this.getPrevStationID();
                if( 
                    prevStn && 
                    !isBetween(
                        s[prevStn].coordinates, 
                        s[currStn].coordinates, 
                        coordinate
                    )
                ) {
                    this.status = 'STOPPED';
                    this.lastStatusChg = simClock;
                    this.coords = s[currStn].coordinates;
                }
                this.coords = coordinate
                this.angle = Math.atan2(
                    (s[currStn].coordinates.y - this.coords.y),
                    (s[currStn].coordinates.x - this.coords.x)
                ) * (180/Math.PI);
                break;
        }

        return this.getVehicleFrame();
    }

} 

export default ActiveVehicle;