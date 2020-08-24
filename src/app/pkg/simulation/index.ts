import { TransitModes } from "../../../editor/components/leftPanel/components/componentView/constants";
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
   nodes: PathSegmentNode[],
   mode: TransitModes,
   route: number | null,
   isLast: boolean,
}
export type PathSegmentNode = {
    coord: Coord,
    stopID?:number,
    isLast: boolean,
}

export type ModeSpeedMap = { [mode: string]: number };
export const getModeSpeedMap = (s: SimulationOptions):ModeSpeedMap => ({
    [TransitModes.FOOT]: s.modeSpeeds.foot,
    [TransitModes.BUS]: s.modeSpeeds.bus,
    [TransitModes.TRAIN]: s.modeSpeeds.train,
    [TransitModes.TRAM]: s.modeSpeeds.tram,
})

export type PassengerPath = {
    [alg: string]: {
        path:   Path,
        isActive: boolean
    }
}

export type FullSimFrame = { 
    simulation: SimulationFrame, 
    evaluation: EvaluationData 
}

export type FrameContainer = { [frame: number]: FullSimFrame }
export type FullSimData = {
    frames: FrameContainer,
    passengerPaths: {
        [pID: number]: PassengerPath
    },
} 

export type SimulationCycle = {
    time: number

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

export type VehicleFrame = { angle: number, passengerCnt: number, coordinate: Coord }
export type VehicleSimData = {
    [vehicleID: number]:  VehicleFrame
}

export type StationSimData = {
    [stationID: number]: StationFrame
}

export type StationFrame = { 
    passengerCnt: number 
    passengerCntByRoute: { 
        [rID: number]: number 
    }
}