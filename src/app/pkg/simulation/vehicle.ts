import { Route, StationDataObj } from "../../../editor/components/leftPanel/components/componentView/constants"
import { Coord, VehicleFrame } from "."

  class ActiveVehicle {
    // consts
    readonly ID: number
    readonly vehicleSpeed: number
    readonly passengers: Set<number>

    // Mutable properties
    lifetime: number
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
    

    constructor(id: number, r: Route, spd: number, depTime: number){
        this.ID = id;
        this.angle = 0;
        this.lifetime = 0;
        this.lastStatusChg = 0;
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

    getPrevStationID = ():(number|null) => 
        this.currentStationIdx > 1?
            this.travellingStations[this.currentStationIdx-1]:null;
    
    getCurrentStationID = ():(number|null) => 
        this.currentStationIdx < this.travellingStations.length-1?
            this.travellingStations[this.currentStationIdx+1]:null;

    getNextStationID = ():(number|null) => 
        this.currentStationIdx > 1 &&
        this.currentStationIdx < this.travellingStations.length-1?
            this.travellingStations[this.currentStationIdx]: null;

    // Main simulation method. 
    // Returns null if vehicle is inactive.
    Simulate(s: StationDataObj, simClock: number):( VehicleFrame | null ) {
        // Startup vehicle...
        if(this.hasCompleted) return null;
        else if(this.status === 'INACTIVE' && simClock === this.departing){
            this.status = 'STOPPED';
            this.lastStatusChg = simClock;
            this.coords = 
                s[this.travellingStations[this.currentStationIdx]].coordinates;
        }
        else if(this.status === 'INACTIVE') return null;
        
        // Simulate....
        this.lifetime += 1;


        return null;
        // switch(this.status) {
        //     case 'STOPPED':
        //         const stoppedFor = t - this.lastStatusChg;
        //         if(Qs[av.routeID][av.destStation].IsEmpty()){
        //             const nextStn = getNextStationID(routes.data[av.routeID], av.destStation)
        //             if(nextStn !== -1 && )
        //             this.destStation = nextStn === -1? this.destStation:nextStn;
        //             this.status = 'INTRANSIT';
        //             this.lastStatusChg = t;
        //         } else if(stoppedFor % simulation.options.stopTime === 0){
        //             const p = Qs[this.routeID][this.destStation].Dequeue();
        //             if(p) this.passengers.add(p); 
        //         }
        //         break;
        //     case 'INTRANSIT':
        //         const v = [
        //             stations.data[av.destStation].coordinates.x - av.coords.x,
        //             stations.data[av.destStation].coordinates.y - av.coords.y,
        //         ];
        //         const vLen = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
        //         const vNorm = [v[0]/vLen, v[1]/vLen];

        //         // speed * time = distance, but time is 1 second in this case.
        //         let coordinate: Coord = {
        //             x: av.coords.x +  speedMap[routes.data[av.routeID].mode] * vNorm[0], 
        //             y: av.coords.y +  speedMap[routes.data[av.routeID].mode] * vNorm[0]
        //         }
        //         const id = getPrevStationID(routes.data[av.routeID], av.destStation)
        //         if(
        //             id !== -1 && !isBetween(
        //             stations.data[id].coordinates, 
        //             stations.data[av.destStation].coordinates, 
        //             coordinate)
        //         ) {
        //             av.status = 'STOPPED';
        //             av.lastStatusChg = t;
        //             av.coords = stations.data[av.destStation].coordinates;
        //         }
        //         av.coords = coordinate
        //         av.angle = Math.atan2(
        //             (stations.data[av.destStation].coordinates.y - av.coords.y),
        //             (stations.data[av.destStation].coordinates.x - av.coords.x)
        //         ) * (180/Math.PI);
        //         break;
        // }
    }

} 

export default ActiveVehicle;