import { Route, StationDataObj } from "../../../editor/components/leftPanel/components/componentView/constants"
import { Coord, VehicleFrame, StationContainer } from "."
import { isBetween } from './geometry';
import ActiveStation from './station';

  class ActiveVehicle {
    // consts
    readonly ID: number
    readonly vehicleSpeed: number
    readonly stopTime: number
    
    // Mutable properties
    activeSince: number
    passengerCnt: number
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
        this.passengerCnt = 0;
        
        // Route properties
        this.routeID = r.id;
        this.departing = depTime;
        this.currentStationIdx = 0;
        this.vehicleType = r.vehicleID;
        this.travellingStations = 
            Object.keys(r.stations).map(k => r.stations[+k].id); 
    }

     // Main simulation method. 
    // Returns null if vehicle is inactive.
    Simulate(simClock: number, stations: StationContainer):( VehicleFrame | null ) {
        // Startup vehicle...
        if(this.hasCompleted) return null;
        else if(this.status === 'INACTIVE' && simClock === this.departing){
            this.status = 'STOPPED';
            this.lastStatusChg = simClock;
            this.activeSince = simClock;
            this.currentStationIdx = 0;

            const currStn = this.getCurrentStationID();
            this.coords = currStn? stations[currStn].getCoords(): {x:0, y:0};
        }
        else if(this.status === 'INACTIVE') return null;
        
        // Simulate ...
        const currStn = this.getCurrentStationID();
        if(!currStn) { console.log(`Vehicle ${this.ID} has no current station`); return null; }
        switch(this.status) {
            case 'STOPPED':
                const stoppedFor = simClock - this.lastStatusChg;
                if(stations[currStn].getPassengersWaitingForRoute(this.routeID) <= 0){
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
                    const p = stations[currStn].getPassengerAtStop(this.routeID);
                    if(p) {
                        this.passengerCnt += 1; 
                    }
                }
                break;
            case 'INTRANSIT':
                const v = [
                    stations[currStn].getCoords().x - this.coords.x,
                    stations[currStn].getCoords().y - this.coords.y,
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
                        stations[prevStn].getCoords(), 
                        stations[currStn].getCoords(), 
                        coordinate
                    )
                ) {
                    this.status = 'STOPPED';
                    this.lastStatusChg = simClock;
                    this.coords = stations[currStn].getCoords();
                }
                this.coords = coordinate
                this.angle = Math.atan2(
                    (stations[currStn].getCoords().y - this.coords.y),
                    (stations[currStn].getCoords().x - this.coords.x)
                ) * (180/Math.PI);
                break;
        }

        return this.getVehicleFrame();
    }
    
    // Getters & Setters
    getID = ():number => this.ID;
    getAngle = ():number => this.angle;
    getCoords = ():Coord => this.coords;
    getCurrentPassengerCount = ():number => this.passengerCnt;

    getVehicleFrame = ():VehicleFrame => ({
        angle: this.getAngle(), 
        coordinate: this.getCoords(),
        passengerCnt: this.getCurrentPassengerCount()
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

} 

export default ActiveVehicle;