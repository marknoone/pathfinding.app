import { TransitModes } from "../../../../leftPanel/components/componentView/constants";
import { IDQueue } from '../../../../../../app/pkg/queues';
export { default as SimulateScenario } from './simulation';

export type Node = {
    id: number,
    center: {x: number, y: number},
}

export type Edge = {
    to: number, 
    mode: TransitModes,
    routeID: number | null,
    
    weight: () => number,
    tdWeight: (timeSecs: number) => number,
    congestion?: (timeSecs: number) => number,
}

export type Graph = { 
    nodes: { [nID: number]: Node   },
    edges: { [nID: number]: Edge[] },
    stationMap: {[sID:number]: number}
}

export type BSMatrix = number[][]

export type ActivePassenger = {
    currentMode: TransitModes | null
    currentVehicle: string | null
    lastStatusChg: number
    status: "TRAVELLING" | "WAITING" | "NOTREADY" | "COMPLETED"

    path: Path
    destNode: number
    coords: {x: number, y: number}
}

export type Path = PathSegment[]
export type PathSegment = {
   nodeIDs: number[],
   mode: TransitModes,
   route: number | null,
}

export type ActiveVehicle = {
    ID: number
    vehicleID: number,
    routeID: number
    destStation: number
    activatedOn: number
    lastStatusChg: number
    status: "STOPPED" | "INTRANSIT",
    passengerCnt: number

    coords: {x: number, y: number}
    alightingPassengers: IDQueue
}   