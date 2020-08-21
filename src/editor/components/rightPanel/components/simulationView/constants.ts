import { EvaluationData } from "./middlewares";
import { Path } from "./simulation";

export type SimulationAction = {
    type: string
    payload?: {
        isBaking?: boolean
        isPlaying?: boolean
        simFrame?: number
        algorithm?: Algorithms
        opts?: SimulationOptions
        pPath?: {path: PassengerPath, pID: number}
        dataFrame?: SimulationFrame
        evalFrame?: EvaluationData
        data?: FullSimData
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
    data: FullSimData | null
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
    INIT_SIMULATION   = "@@simulation/INIT_SIMULATION",
    BAKE_SCENARIO       = "@@simulation/BAKE_SCENARIO",
    PUSH_PASSENGER_PATHS       = "@@simulation/PUSH_PASSENGER_PATHS",
    PUSH_BAKED_FRAME       = "@@simulation/PUSH_BAKED_FRAME",
    SET_BAKED_FRAMES       = "@@simulation/SET_BAKED_FRAMES",
    INC_BAKED_FRAMES       = "@@simulation/INC_BAKED_FRAMES",
    DEC_BAKED_FRAMES       = "@@simulation/DEC_BAKED_FRAMES",
    COMPLETE_BAKE       = "@@simulation/COMPLETE_BAKE",
    CANCEL_BAKE       = "@@simulation/CANCEL_BAKE"
}

export enum Algorithms {
    Dijkstra = 1,
    TimeDependentDijkstra = 2,
    MultiModalTimeDependentDijkstra = 3,
    CMTDijkstra = 4
}

export const Playspeeds = [-32, -16, -4, -2, 1, 2, 4, 16, 32];

export type PassengerPath = {
    [alg: string]: {
        path:   Path,
        isActive: boolean
    }
}

export type FullSimData = {
    frames: { 
        [frame: number]:{ 
            simulation: SimulationFrame, 
            evaluation: EvaluationData 
        }
    },

    passengerPaths: {
        [pID: number]: PassengerPath
    },
} 

export type SimulationFrame = {
    passengers: PassengerSimData,
    stations: StationSimData,
    vehicles: VehicleSimData,
}

export type Coord = { x: number, y: number }
export type CoordEvalFunc = (coords: Coord) => (number|null)

export type PassengerFrame = { coordinates: Coord }
export type PassengerSimData = {
    [passengerID: number]: {
        [frame: number]: PassengerFrame
    }
}

export type StationFrame = { passengerCnt: number }
export type StationSimData = {
    [stationID: number]: {
        [frameID:number]: StationFrame
    }
}

export type VehicleFrame = { angle: number, passengerCnt: number, coordinate: Coord }
export type VehicleSimData = {
    [vehicleID: number]: {
        [frameID:number]: VehicleFrame
    }
}
