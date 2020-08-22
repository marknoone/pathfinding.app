import { TransitModes } from "../../../editor/components/leftPanel/components/componentView/constants";
import { Queue } from '../queues';
import { EvaluationData } from './middlewares';

import Simulator from './simulation';
export default Simulator;

export type Node = {
    id: number,
    center: {x: number, y: number},
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

export type Edge = {
    to: number, 
    mode: TransitModes,
    routeID: number | null,
    
    weight: () => number,
    tdWeight: (timeSecs: number) => number,
    congestion?: (timeSecs: number) => number,
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

export type ModeSpeedMap = { [mode: string]: number };
export const getModeSpeedMap = (s: SimulationOptions):ModeSpeedMap => ({
    [TransitModes.FOOT]: s.modeSpeeds.foot,
    [TransitModes.BUS]: s.modeSpeeds.bus,
    [TransitModes.TRAIN]: s.modeSpeeds.train,
    [TransitModes.TRAM]: s.modeSpeeds.tram,
})

export type StationQueues = {
    [routeID: number]: { 
        [stationID:number]: Queue<number>
    }
};

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
    [passengerID: number]: PassengerFrame
}

export type StationFrame = { passengerCnt: number }
export type StationSimData = {
    [stationID: number]: StationFrame
}

export type VehicleFrame = { angle: number, passengerCnt: number, coordinate: Coord }
export type VehicleSimData = {
    [vehicleID: number]:  VehicleFrame
}
