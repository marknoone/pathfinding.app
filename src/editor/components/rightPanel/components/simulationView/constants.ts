export type SimulationAction = {
    type: string
    payload?: {
        isPlaying?: boolean
        simFrame?: number
        algorithm?: Algorithms
    }
}

export type SimulationState = {
    simClock: number
    algorithm: Algorithms
    playSpeedIdx: number

    isBaking: boolean
    isSimulating: boolean
    isPlaying: boolean

    data: {
        passengerSimData: PassengerSimData,
        stationSimData: StationSimData
        vehicleSimData: VehicleSimData
    } | null
}

export enum SimulationActionTypes {
    SET_SIMULATION_ALGORITHM = "@@simulation/SET_SIMULATION_ALGORITHM",
    SET_SIMULATION_FRAME = "@@simulation/SET_SIMULATION_ALGORITHM",
    INC_SIMULATION_FRAME = "@@simulation/INC_SIMULATION_FRAME",
    DEC_SIMULATION_FRAME = "@@simulation/DEC_SIMULATION_FRAME",
    INC_PLAY_SPEED = "@@simulation/INC_PLAY_SPEED",
    DEC_PLAY_SPEED = "@@simulation/DEC_PLAY_SPEED",
    SET_IS_PLAYING = "@@simulation/SET_IS_PLAYING",
    SIMULATE_SCENARIO   = "@simulation/SIMULATE_SCENARIO",
    BAKE_SCENARIO       = "@simulation/BAKE_SCENARIO"
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

export type Graph = { nodes: {[boxID: number]:{}}}