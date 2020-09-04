import { Route, Station } from "../../../editor/components/leftPanel/components/componentView/constants"
import { Coord, VehicleFrame } from "."
import { distance } from './geometry';
import { vehicleEventObj } from "./events/vehicle";
import EventManager, { SimulationEvent, Event, EventType  } from "./events"
import { PassengerEventTags, PassengerEventObj, isPassengerEventObj } from "./events/passenger"
import { VehicleEventTags } from "./events/vehicle";

  class ActiveVehicle {
    // consts
    readonly ID: number
    readonly vehicleID: number
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
    vehicleCapacity: number
    currentStationIdx: number
    travellingStations: Station[]
    

    constructor(id: number, r: Route, stns: Station[], capacity: number, spd: number, depTime: number, stopTime: number){
        this.ID = id;
        this.angle = 0;
        this.activeSince = 0;
        this.lastStatusChg = 0;
        this.stopTime = stopTime;
        this.status = "INACTIVE";
        this.hasCompleted = false;
        this.coords = { x: 0, y: 0 }
        this.vehicleSpeed = spd;
        this.vehicleID = r.vehicleID;
        this.passengers = new Set<number>();
        
        // Route properties
        this.routeID = r.id;
        this.departing = depTime;
        this.currentStationIdx = 0;
        this.vehicleCapacity = capacity;
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
            if(this.getCurrentStation())
                eventManager.emitEvent(new Event(
                    VehicleEventTags[VehicleEventTags.ARRIVED_AT_STOP_EVENT],
                    EventType.VEHICLE_EVENT,
                    simClock, vehicleEventObj({
                        stopID: this.getCurrentStation()!.id, 
                        routeID: this.routeID, 
                        vehicleID: this.ID,
                        currentCapacity: this.vehicleCapacity,
                        currentPassengers: this.passengers.size,
                    })
                ));
        }
        else if(this.status === 'INACTIVE') return null;
        
        // Maintenance
        this.checkPassengersOnboard(simClock, eventManager);

        // Simulate ...
        const currStn = this.getCurrentStation();
        if(!currStn) { 
            console.log(`Vehicle ${this.ID} has no current station`); 
            this.hasCompleted = true; 
            this.status = 'INACTIVE';
            return null;
        }

        switch(this.status) {
            case 'STOPPED':
                const stoppedFor = simClock - this.lastStatusChg;
                this.coords = currStn.coordinates;
                const nextStn = this.getNextStation();
                this.angle = nextStn? Math.atan2(
                    (nextStn.coordinates.y - this.coords.y),
                    (nextStn.coordinates.x - this.coords.x)
                ) * (180/Math.PI): this.angle;
                if(stoppedFor % this.stopTime !== 0)
                    break; 

                const arrivalEvents = eventManager
                    .getEventsWithTag(PassengerEventTags[PassengerEventTags.ARRIVED_AT_STOP_EVENT])
                    .filter((e:SimulationEvent) => {
                        const pObj = e.getObj()
                        if(!isPassengerEventObj(pObj)) return false;
                        return pObj.routeID === this.routeID && 
                            pObj.stopID === currStn.id;
                    }); 
                if(arrivalEvents.length <= 0 || this.passengers.size >= this.vehicleCapacity){
                    if(this.passengers.size >= this.vehicleCapacity)
                        eventManager.emitEvent(new Event(
                            VehicleEventTags[VehicleEventTags.MISSED_PASSENGERS],
                            EventType.VEHICLE_EVENT,
                            simClock, vehicleEventObj({
                                stopID: currStn.id, 
                                routeID: this.routeID, 
                                vehicleID: this.ID,
                                missedPassengers: arrivalEvents.length,
                                currentCapacity: this.vehicleCapacity,
                                currentPassengers: this.passengers.size,
                            })
                        ));
                    const nextStn = this.getNextStation();
                    if(!nextStn){ 
                        this.hasCompleted = true; 
                        this.status = 'INACTIVE';
                        return this.getVehicleFrame();
                    } 

                    this.currentStationIdx += 1;
                    this.status = 'INTRANSIT';
                    this.lastStatusChg = simClock;

                    eventManager.emitEvent(new Event(
                        VehicleEventTags[VehicleEventTags.DEPARTING_STOP],
                        EventType.VEHICLE_EVENT,
                        simClock, vehicleEventObj({
                            stopID: currStn.id, 
                            routeID: this.routeID, 
                            vehicleID: this.ID,
                            currentCapacity: this.vehicleCapacity,
                            currentPassengers: this.passengers.size,
                        })
                    ));
                } else {
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

                let coordinate: Coord = {
                    x: this.coords.x +  this.vehicleSpeed * vNorm[0], 
                    y: this.coords.y +  this.vehicleSpeed * vNorm[1]
                }

                if(distance(coordinate, currStn.coordinates) < this.vehicleSpeed) {
                    this.status = 'STOPPED';
                    this.lastStatusChg = simClock;
                    this.coords = currStn.coordinates;
                    this.emitCoordinateChange(simClock, eventManager);
                    const nextStn = this.getNextStation();
                    this.angle = nextStn? Math.atan2(
                        (nextStn.coordinates.y - this.coords.y),
                        (nextStn.coordinates.x - this.coords.x)
                    ) * (180/Math.PI): this.angle;
                    eventManager.emitEvent(new Event(
                        VehicleEventTags[VehicleEventTags.ARRIVED_AT_STOP_EVENT],
                        EventType.VEHICLE_EVENT,
                        simClock, vehicleEventObj({
                            stopID: currStn.id, 
                            routeID: this.routeID, 
                            vehicleID: this.ID,
                            currentCapacity: this.vehicleCapacity,
                            currentPassengers: this.passengers.size,
                        })
                    ));
                    return this.getVehicleFrame();
                }
                this.coords = coordinate
                this.emitCoordinateChange(simClock, eventManager);
                this.angle = Math.atan2(
                    (currStn.coordinates.y - this.coords.y),
                    (currStn.coordinates.x - this.coords.x)
                ) * (180/Math.PI);
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
        originalVID: this.vehicleID,
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

    emitCoordinateChange = (simClock: number, e: EventManager) =>
        e.emitEvent(new Event(
            VehicleEventTags[VehicleEventTags.NEW_POSITION],
            EventType.VEHICLE_EVENT,
            simClock, vehicleEventObj({
                stopID: this.getCurrentStation()!.id, 
                routeID: this.routeID, 
                vehicleID: this.ID,
                coordinates: this.coords,
                currentCapacity: this.vehicleCapacity,
                currentPassengers: this.passengers.size,
            })
        ));

    checkPassengersOnboard(simClock: number, em: EventManager)
    {
        const arrivalEvents = em
            .getEventsWithTag(PassengerEventTags[PassengerEventTags.ALIGHT_EVENT])
            .filter((e:SimulationEvent) => {
                const pObj = e.getObj()
                if(!isPassengerEventObj(pObj) && pObj.vehicleID) return false;
                return pObj.vehicleID === this.ID;
            }); 

        arrivalEvents.forEach((e: SimulationEvent) => {
            const pObj = e.getObj() as PassengerEventObj;
            if (this.passengers.has(pObj.passengerID)){
                this.passengers.delete(pObj.passengerID);
                em.deleteEvent(e.getID());
            }
        });
    }

} 

export default ActiveVehicle;