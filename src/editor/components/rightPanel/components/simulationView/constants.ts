import { TransitModes } from "../../../leftPanel/components/componentView/constants";
import { IDQueue } from '../../../../../app/pkg/queue/queue';

export type SimulationAction = {
    type: string
    payload?: {
        isBaking?: boolean
        isPlaying?: boolean
        simFrame?: number
        algorithm?: Algorithms
        opts?: SimulationOptions
    }
}

export type SimulationOptions = {
    stopTime: number,
    distanceMul: number,
    mmLanguage: string,
    congestionInterval: number,
    passengerCompliance: number,
    modeSpeeds: {
        foot: number,
        bus: number,
        train: number,
        tram: number,
    }
}

export type SimulationState = {
    simClock: number
    algorithm: Algorithms
    playSpeedIdx: number

    isSimulating: boolean
    isPlaying: boolean
    
    isBaking: boolean
    bakedFrames: {
        current: number,
        total: number
    }

    options: SimulationOptions
    data: {
        passengerSimData: PassengerSimData,
        stationSimData: StationSimData
        vehicleSimData: VehicleSimData
    } | null
}

export enum SimulationActionTypes {
    SET_SIMULATION_ALGORITHM = "@@simulation/SET_SIMULATION_ALGORITHM",
    SET_SIMULATION_FRAME = "@@simulation/SET_SIMULATION_ALGORITHM",
    SET_SIMULATION_OPTS = "@@simulation/SET_SIMULATION_OPTS",
    INC_SIMULATION_FRAME = "@@simulation/INC_SIMULATION_FRAME",
    DEC_SIMULATION_FRAME = "@@simulation/DEC_SIMULATION_FRAME",
    INC_PLAY_SPEED = "@@simulation/INC_PLAY_SPEED",
    DEC_PLAY_SPEED = "@@simulation/DEC_PLAY_SPEED",
    SET_IS_PLAYING = "@@simulation/SET_IS_PLAYING",
    SIMULATE_SCENARIO   = "@@simulation/SIMULATE_SCENARIO",
    BAKE_SCENARIO       = "@@simulation/BAKE_SCENARIO",
    SET_BAKED_FRAMES       = "@@simulation/SET_BAKED_FRAMES",
    CANCEL_BAKING       = "@@simulation/CANCEL_BAKING"
}

export enum Algorithms {
    Dijkstra = 1,
    TimeDependentDijkstra = 2,
    MultiModalTimeDependentDijkstra = 3,
    CMTDijkstra = 4
}

export const Playspeeds = [-32, -16, -4, -2, 1, 2, 4, 16, 32];

export type Coord = {x: number, y: number}
export type PassengerSimData = {
    passengerID: number,
    paths: {
        [alg: string]: {
            points:   Coord[],
            isActive: boolean
        }
    },

    coordinates: {[simStep: number]: { val: number[] }}
}

export type StationSimData = {
    stationID: number,
    passengerCnt: {[simStep: number]: { val: number }}
}

export type VehicleSimData = {
    vehicleID: number,

    angle:          {[simStep: number]: { val: number }},
    coordinates:    {[simStep: number]: { val: number[] }},
    passengerCnt:   {[simStep: number]: { val: number }},
}


// Simulation types...
export type Node = {
    id: number,
    queue: IDQueue | null
    center: {x: number, y: number},
}

export type Edge = {
    to: number, 
    mode: TransitModes,
    
    weight: (timeSecs: number) => number,
    congestion?: (timeSecs: number) => number,
}

export type Graph = { 
    nodes: { [nID: number]: Node   },
    edges: { [nID: number]: Edge[] },
}

export type BSMatrix = number[][]

export type ActivePassenger = {
    currentMode: TransitModes
    currentVehicle: string
    lastStatusChg: number
    status: "TRAVELLING" | "WAITING" | "ONBOARD"

    path: string[]
    destNode: string
    coords: {x: number, y: number}
}

export type ActiveVehicle = {
    destStation: string
    activatedOn: number
    lastStatusChg: number
    status: "STOPPED" | "INTRANSIT"

    coords: {x: number, y: number}
    alightingPassengers: IDQueue
}   

export interface EvaluationMiddleware {}