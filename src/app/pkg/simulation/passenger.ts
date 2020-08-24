import Graph from "./graph";
import { isBetween } from './geometry';
import { put } from 'redux-saga/effects';
import { PassengerFrame, Coord } from ".";
import { Path, PathSegment, PathSegmentNode } from "."
import EventManager, { Event, SimulationEvent } from "./events"
import { passengerEventObj, PassengerEventTags } from "./events/passenger";
import { VehicleEventTags, VehicleEventObj, isVehicleEventObj, getVehicleCoordChange } 
    from "./events/vehicle"
import { TransitModes } 
    from "../../../editor/components/leftPanel/components/componentView/constants";
import { Passenger } 
    from "../../../editor/components/leftPanel/components/passengerView/constants";

class ActivePassenger {
    ID: number
    dest: Coord
    start: Coord
    graph: Graph
    departing: number
    activeSince: number
    walkingSpeed: number
    lastStatusChg: number
    hasCompleted: boolean
    currentVehicle: number
    status: "TRAVELLING" | "WAITING" | "INACTIVE"

    coords: Coord
    path: (Path | null)
    pathSegmentIdx: number
    pathSegmentNodeIdx: number

    constructor(id: number, p: Passenger, wSpd: number,g: Graph){
        this.ID = id;
        this.graph = g;
        this.departing = p.tod;
        this.activeSince = 0;
        this.lastStatusChg = 0;
        this.currentVehicle = -1;
        this.walkingSpeed = wSpd;
        this.status = "INACTIVE";
        this.hasCompleted = false;
        this.coords = {x: 0, y: 0};
        
        // Path properties
        this.path = null;
        this.start = p.start;
        this.pathSegmentIdx = 0;
        this.pathSegmentNodeIdx = 0;
        this.dest = p.destination;
    }

    Simulate(simClock: number, eventManager: EventManager): (PassengerFrame | null) {
        // Passenger initialisation
        if(this.hasCompleted) return null;
        else if(this.status === 'INACTIVE' && simClock === this.departing){
            this.status = 'TRAVELLING';
            this.lastStatusChg = simClock;
            this.activeSince = simClock;
            this.pathSegmentIdx = 0;
            this.path = this.graph.computePath(this.start, this.dest, this.departing);
            if(!this.path || this.path.length <= 0){
                this.hasCompleted = true;
                console.error(`Error getting path for passenger ${this.ID}`)
                return null;
            } 

            eventManager.emitEvent(new Event(
                PassengerEventTags[PassengerEventTags.PATH_CALCULATED],
                simClock, passengerEventObj({
                    passengerID: this.getID(), 
                    alg: this.graph.getAlg(),
                    eventPath: { path: this.path, isActive: true}
                })
            ));
            
            const segment = this.mustGetCurrentSegment();
            this.coords = segment.nodes[this.pathSegmentNodeIdx].coord;
        }
        else if(this.status === 'INACTIVE') return null;

        // Simulate...
        const segment = this.mustGetCurrentSegment();
        const segmentNode = this.mustGetCurrentSegmentNode();
        switch(this.status){
            case 'WAITING':
                const arrivalEvent = eventManager
                    .getEventsWithTag(VehicleEventTags[VehicleEventTags.ARRIVED_AT_STOP_EVENT])
                    .find((e:SimulationEvent) => {
                        const vObj = e.getObj();
                        if(!isVehicleEventObj(vObj)) return false;
                        return vObj.routeID === segment.route && 
                            vObj.stopID === segmentNode.stopID!;
                    });
                if(arrivalEvent){
                    this.currentVehicle = (<VehicleEventObj>arrivalEvent.getObj()).vehicleID;
                    eventManager.emitEvent(new Event(
                        PassengerEventTags[PassengerEventTags.BOARDING_EVENT],
                        simClock,
                        passengerEventObj({
                            stopID: segmentNode.stopID!, 
                            routeID: segment.route!, 
                            passengerID: this.ID, 
                            vehicleID: (<VehicleEventObj>arrivalEvent.getObj()).vehicleID
                        })
                    ))
                }
            case 'TRAVELLING':
                if(segment.mode === TransitModes.FOOT){
                    const nextNode = this.getNextSegmentNode();
                    if(!nextNode) return this.getPassengerFrame();

                    const v = [
                        nextNode.coord.x - this.coords.x,
                        nextNode.coord.y - this.coords.y,
                    ];
                    const vLen = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
                    const vNorm = [v[0]/vLen, v[1]/vLen];
    
                    // speed * time = distance, but time is 1 second in this case.
                    let coordinate: Coord = {
                        x: this.coords.x +  this.walkingSpeed * vNorm[0], 
                        y: this.coords.y +  this.walkingSpeed * vNorm[1]
                    }
    
                    const isCoordBetween = isBetween(segmentNode.coord, nextNode.coord, coordinate)
                    if( !isCoordBetween && nextNode.isLast) {
                        if(segment.isLast) this.hasCompleted = true;
                        else {
                            this.pathSegmentIdx += 1;
                            this.pathSegmentNodeIdx = 0;
                            this.status = this.getCurrentSegment()!.mode === TransitModes.FOOT?
                                'TRAVELLING': 'WAITING';
                            if(this.status === 'WAITING')
                                eventManager.emitEvent(new Event(
                                    PassengerEventTags[PassengerEventTags.ARRIVED_AT_STOP_EVENT],
                                    simClock,
                                    passengerEventObj({
                                        stopID: this.getCurrentSegmentNode()!.stopID!, 
                                        routeID: this.getCurrentSegment()!.route!, 
                                        passengerID: this.ID
                                    })
                                ));
                        }
                    } else if(!isCoordBetween) {
                        this.lastStatusChg = simClock;
                        this.coords = segmentNode.coord;
                        this.pathSegmentNodeIdx += 1;
                    } else 
                        this.coords = coordinate;
                } else {
                    const newC = getVehicleCoordChange(this.currentVehicle, eventManager)
                    if(newC)
                        this.coords = newC;
                }
        }

        return this.getPassengerFrame();
    }

    // Getters / setters
    getID = ():number => this.ID;

    getPassengerFrame = ():PassengerFrame =>
        ({ coordinates: this.coords })

    getCurrentSegment = () => 
        this.path?this.path[this.pathSegmentIdx]: null;
        
    getCurrentSegmentNode = () => 
        this.path?
        this.path[this.pathSegmentIdx].nodes[this.pathSegmentNodeIdx]
        : null;

    getNextSegmentNode = () => 
        this.path && this.pathSegmentNodeIdx > 0?
            this.path[this.pathSegmentIdx].nodes[this.pathSegmentNodeIdx - 1]
            : null;
    
    getPrevSegmentNode = () => 
        this.path && this.pathSegmentNodeIdx < this.path[this.pathSegmentIdx].nodes.length-1?
            this.path[this.pathSegmentIdx].nodes[this.pathSegmentNodeIdx - 1]
            : null;
        

    // Must getters...
    mustGetCurrentSegment = () => 
        this.getCurrentSegment() as PathSegment;

    mustGetCurrentSegmentNode = () => 
        this.getCurrentSegmentNode() as PathSegmentNode;
    
    mustGetNextSegmentNode = () => 
        this.getNextSegmentNode() as PathSegmentNode;

    mustGetPrevSegmentNode = () => 
        this.getNextSegmentNode() as PathSegmentNode;
}

export default ActivePassenger;