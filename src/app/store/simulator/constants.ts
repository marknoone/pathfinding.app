export type SimulationAction = {
    type: string
}

export enum SimulationActionType {
    SIMULATE_SCENARIO   = "@simulation/SIMULATE_SCENARIO",
    BAKE_SCENARIO       = "@simulation/BAKE_SCENARIO"
}

export type SimulationState = {
    simulatedScenarioIdx: number
    data: {
        passengerSimData: PassengerSimData
        stationSimData: StationSimData
        vehicleSimData: VehicleSimData
    } | null
}

export type PassengerSimData = {
    passengerID: number,
    paths: {
        [alg: string]: {
            points: number[][],
            isActive:boolean
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