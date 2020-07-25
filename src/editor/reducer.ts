import { combineReducers, Reducer } from 'redux';
import { Algorithms, Playspeed } from './components/rightPanel/components/simulationView/constants';
import PassengerReducer from './components/leftPanel/components/passengerView/reducer';
import SimulationReducer from './components/rightPanel/components/simulationView/reducer';
import { RouteReducer, StationReducer,  VehicleReducer} 
    from './components/leftPanel/components/componentView/reducer';
import { ScenarioState, ScenarioAction, ScenarioActionTypes, Scenario } from './constants' 
import { PassengerTree } from './components/leftPanel/components/passengerView/constants';

const scenarioReducer = combineReducers({
    stations:   StationReducer,
    routes:     RouteReducer,
    vehicles:   VehicleReducer,
    passengers: PassengerReducer,
    simulationConfig: SimulationReducer,
});

const initialState = {
    activeScenarioIdx: 0,
    scenarios: [{
        name: "Scenario-1",
        stations:   { nextId: 0, data: {}},
        routes:     { nextId: 0, data: {}},
        vehicles:   { nextId: 0, data: {}},
        passengers: { nextId: 0, tree: {} as PassengerTree },
        simulationConfig: {
            isPlaying: false,
            simFrame: 1,
            algorithm: Algorithms.Dijkstra,
            playSpeed: 1 as Playspeed
        }
    }]
}

export const scenarioStateReducer: Reducer<ScenarioState, ScenarioAction> = (state = initialState, action) => {
    console.log(state, action);
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
                Object.assign(
                    {}, 
                    state.scenarios[state.activeScenarioIdx],
                    scenarioReducer(state.scenarios[state.activeScenarioIdx], action)
                ),
                ...state.scenarios.slice(state.activeScenarioIdx)
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
        case ScenarioActionTypes.SET_SCENARIO_NAME_BY_IDX:
            return {
                ...state,
                scenarios: [
                    ...state.scenarios.slice(0, action.payload.id),
                    Object.assign(
                        {}, 
                        state.scenarios[state.activeScenarioIdx], 
                        {name: action.payload.name}
                    ),
                    ...state.scenarios.slice(action.payload.id)
                ]
            }
        default:
            return state
    }
}

export default scenarioStateReducer;;