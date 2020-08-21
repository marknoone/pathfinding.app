import { TransitModes } from "../../../../leftPanel/components/componentView/constants";
import { IDQueue } from '../../../../../../app/pkg/queues';
export { default as SimulateScenario } from './simulation';

export type Node = {
    id: number,
    queue: IDQueue | null
    center: {x: number, y: number},
}

export type Edge = {
    to: number, 
    mode: TransitModes,
    
    weight: () => number,
    tdWeight: (timeSecs: number) => number,
    congestion?: (timeSecs: number) => number,
}

export type Graph = { 
    nodes: { [nID: number]: Node   },
    edges: { [nID: number]: Edge[] },
}

export type BSMatrix = number[][]

export type ActivePassenger = {
    currentMode: TransitModes | null
    currentVehicle: string | null
    lastStatusChg: number
    status: "TRAVELLING" | "WAITING" | "NOTREADY" | "COMPLETED"

    path: Path
    destNode: string
    coords: {x: number, y: number}
}

export type Path = {
   nodeID: number 
}[]

export type ActiveVehicle = {
    destStation: string
    activatedOn: number
    lastStatusChg: number
    status: "STOPPED" | "INTRANSIT"

    coords: {x: number, y: number}
    alightingPassengers: IDQueue
}   