import { Route, Station } from "../../../editor/components/leftPanel/components/componentView/constants"
import { Coord, VehicleFrame } from "."
import { isBetween } from './geometry';
import EventManager, { SimulationEvent } from "./events"
import { PassengerEventTags, PassengerEventObj, isPassengerEventObj } from "./events/passenger"

  class ActiveVehicle {
    // consts
    readonly ID: number
    readonly vehicleSpeed: number
    readonly stopTime: number
    readonly passengers: Set<number>
    
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
    travellingStations: Station[]
    

    constructor(id: number, r: Route, stns: Station[], spd: number, depTime: number, stopTime: number){
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
        this.travellingStations = stns;
    }

    // Main simulation method. 
    // Returns null if vehicle is inactive.
    Simulate(simClock: number, eventManager: EventManager):( VehicleFrame | null ) {
        // Startup vehicle...
        if(this.hasCompleted) return null;
        else if(this.status === 'INACTIVE' && simClock === this.departing){
            this.status = 'STOPPED';
            this.lastStatusChg = simClock;
            this.activeSince = simClock;
            this.currentStationIdx = 0;

            const currStn = this.getCurrentStation();
            this.coords = currStn? currStn.coordinates: {x:0, y:0};
        }
        else if(this.status === 'INACTIVE') return null;
        
        // Simulate ...
        const currStn = this.getCurrentStation();
        if(!currStn) { console.log(`Vehicle ${this.ID} has no current station`); return null; }
        switch(this.status) {
            case 'STOPPED':
                const stoppedFor = simClock - this.lastStatusChg;
                const arrivalEvents = eventManager
                    .getEventsWithTag(PassengerEventTags[PassengerEventTags.ARRIVED_AT_STOP_EVENT])
                    .filter((e:SimulationEvent) => {
                        const pObj = e.getObj()
                        if(!isPassengerEventObj(pObj)) return false;
                        return pObj.routeID === this.routeID && 
                            pObj.stopID === currStn.id;
                    });
                if(arrivalEvents.length <= 0){
                    const nextStn = this.getNextStation();
                    if(!nextStn){
                        this.hasCompleted = true; 
                        this.status = 'INACTIVE';
                    } else {
                        this.currentStationIdx += 1;
                        this.status = 'INTRANSIT';
                    }
                    this.lastStatusChg = simClock;
                } else if(stoppedFor % this.stopTime === 0){
                    const eObj = arrivalEvents[0].getObj() as PassengerEventObj
                    this.passengers.add(eObj.passengerID);
                    eventManager.deleteEvent(arrivalEvents[0].getID());
                }
                break;
            case 'INTRANSIT':
                const v = [
                    currStn.coordinates.x - this.coords.x,
                    currStn.coordinates.y - this.coords.y,
                ];
                const vLen = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
                const vNorm = [v[0]/vLen, v[1]/vLen];

                // speed * time = distance, but time is 1 second in this case.
                let coordinate: Coord = {
                    x: this.coords.x +  this.vehicleSpeed * vNorm[0], 
                    y: this.coords.y +  this.vehicleSpeed * vNorm[1]
                }

                const prevStn = this.getPrevStation();
                if( 
                    prevStn && 
                    !isBetween(
                        prevStn.coordinates, 
                        currStn.coordinates, 
                        coordinate
                    )
                ) {
                    this.status = 'STOPPED';
                    this.lastStatusChg = simClock;
                    this.coords = currStn.coordinates;
                }
                this.coords = coordinate
                this.angle = Math.atan2(
                    (currStn.coordinates.y - this.coords.y),
                    (currStn.coordinates.x - this.coords.x)
                ) * (180/Math.PI);
                break;
        }

        return this.getVehicleFrame();
    }
    
    // Getters & Setters
    getID = ():number => this.ID;
    getAngle = ():number => this.angle;
    getCoords = ():Coord => this.coords;
    getCurrentPassengerCount = ():number => this.passengers.size;

    getVehicleFrame = ():VehicleFrame => ({
        angle: this.getAngle(), 
        coordinate: this.getCoords(),
        passengerCnt: this.getCurrentPassengerCount()
    })

    getPrevStation = ():(Station|null) => 
        this.currentStationIdx > 1?
            this.travellingStations[this.currentStationIdx-1]:null;
    
    getNextStation = ():(Station|null) => 
        this.currentStationIdx < this.travellingStations.length-1?
            this.travellingStations[this.currentStationIdx+1]:null;

    getCurrentStation = ():(Station|null) => 
        this.currentStationIdx >= 0 &&
        this.currentStationIdx < this.travellingStations.length?
            this.travellingStations[this.currentStationIdx]: null;

} 

export default ActiveVehicle;