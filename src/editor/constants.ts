import { PassengerState } from './components/leftPanel/components/passengerView/constants'
import { SimulationState } from './components/rightPanel/components/simulationView/constants';
import { 
    StationsState, 
    RoutesState, 
    VehiclesState 
} from './components/leftPanel/components/componentView/constants'

export enum ComponentTypes {
    STATION   = "STATION",
    ROUTE     = "ROUTE",
    VEHICLE   = "VEHICLE",
    PASSENGER = "PASSENGER"
}

export type ScenarioAction = {
    type: string,
    payload: {
        id: number,
        name?: string,
        scenarios?: Scenario[] 
    }
}

export enum ScenarioActionTypes {
    SET_SCENARIO_IDX = "@scenario/SET_SCENARIO_IDX",
    SET_SCENARIO_STATE = "@scenario/SET_SCENARIO_STATE",
    SET_SCENARIO_NAME_BY_IDX = "@@scenario/SET_SCENARIO_NAME_BY_IDX"
}

export type ScenarioState = {
    activeScenarioIdx: number
    scenarios: Scenario[]
}

export type Scenario = {
    name:               string
    stations:           StationsState
    routes:             RoutesState
    vehicles:           VehiclesState
    passengers:         PassengerState
    simulationConfig:   SimulationState
}