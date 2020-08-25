import { TransitModes } from "../../../editor/components/leftPanel/components/componentView/constants";
import { EvaluationData } from './middlewares';
import Simulator from './simulation';

export { SaveSimulationResults, GetSimulationResults } from './storage';
export default Simulator;

export type Node = {
    id: number,
    center: {x: number, y: number},
}

export type SimulationResults = {
    journeyTimes: { [pID: number]: number }
    vehicleOperationTimes: { [vID: number]: number }

    passengerTransfers: number
    missedPassengers: number
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
    isLast: boolean,
    stopID?: number,
}

export type ModeSpeedMap = { [mode: string]: number };
export const getModeSpeedMap = (s: SimulationOptions):ModeSpeedMap => ({
    [TransitModes.TRAIN]: s.modeSpeeds.train,
    [TransitModes.TRAM]: s.modeSpeeds.tram,
    [TransitModes.FOOT]: s.modeSpeeds.foot,
    [TransitModes.BUS]: s.modeSpeeds.bus,
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

export type VehicleSimData = {[vehicleID: number]:  VehicleFrame}
export type VehicleFrame = { 
    angle: number, 
    coordinate: Coord,
    passengerCnt: number, 
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