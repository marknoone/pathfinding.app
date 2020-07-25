import { combineReducers, Reducer } from 'redux';
import PassengerReducer from './components/leftPanel/components/passengerView/reducer';
import SimulationReducer from './components/rightPanel/components/simulationView/reducer';
import { RouteReducer, StationReducer,  VehicleReducer} 
    from './components/leftPanel/components/componentView/reducer';
import { ScenarioState, ScenarioAction, ScenarioActionTypes } from './constants' 

const scenarioReducer = combineReducers({
    stations:   StationReducer,
    routes:     RouteReducer,
    vehicles:   VehicleReducer,
    passengers: PassengerReducer,
    simulationConfig: SimulationReducer,
});

const initialState = {
    activeScenarioIdx: 0,
    scenarios: []
}

export const scenarioStateReducer: Reducer<ScenarioState, ScenarioAction> = (state = initialState, action) => {
    if (
            action.type.startsWith('@@vehicle/') ||
            action.type.startsWith('@@passenger/') ||
            action.type.startsWith('@@route/') ||
            action.type.startsWith('@@station/') ||
            action.type.startsWith('@@simulation/')
    ) {
        return {
            ...state,
            scenarios: [
                ...state.scenarios.slice(0, state.activeScenarioIdx),
                scenarioReducer(state.scenarios[state.activeScenarioIdx], action),
                ...state.scenarios.slice(state.activeScenarioIdx + 1)
            ]
        }
    }
    
    switch(action.type) {
        case ScenarioActionTypes.SET_SCENARIO_IDX:
            return {
                ...state,
                activeScenarioIdx: action.payload.id
            }
        case ScenarioActionTypes.SET_SCENARIO_STATE:
            return action.payload.scenarios? {
                activeScenarioIdx: action.payload.id,
                scenarios: action.payload.scenarios
            }: state;
        default:
            return state
    }
}

export default scenarioStateReducer;