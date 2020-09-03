import { combineReducers, Reducer } from 'redux';
import { ScenarioState, ScenarioActionTypes } from './constants' 
import PassengerReducer from './components/leftPanel/components/passengerView/reducer';
import SimulationReducer from './components/rightPanel/components/simulationView/reducer';
import { PassengerTree } from './components/leftPanel/components/passengerView/constants';
import { dummyStnDataObj, dummyRouterDataObj, dummyVehicleDataObj, dummyPassenger } from './dummyData';
import { initialState as SimulationInitialState} from './components/rightPanel/components/simulationView/reducer';
import { RouteReducer, StationReducer,  VehicleReducer} 
    from './components/leftPanel/components/componentView/reducer';


const scenarioReducer = combineReducers({
    stations:   StationReducer,
    routes:     RouteReducer,
    vehicles:   VehicleReducer,
    passengers: PassengerReducer,
    simulation: SimulationReducer,
});

export const initialState = {
    activeScenarioIdx: 0,
    scenarios: [{
        name: "Scenario-1",
        stations:   { nextId: 1, data: {} },
        routes:     { nextId: 1, data: {} },
        vehicles:   { nextId: 1, data: {} },

        passengers: { nextId: 1, tree: {
            0 : {id: 0, name: "All Passengers", children:  []}
        } as PassengerTree },

        simulation: SimulationInitialState
    }]
}

export const scenarioStateReducer: Reducer<ScenarioState, any> = (state = initialState, action) => {
    if (
            action.type.startsWith('@@vehicle/') ||
            action.type.startsWith('@@passenger/') ||
            action.type.startsWith('@@route/') ||
            action.type.startsWith('@@station/') ||
            action.type.startsWith('@@simulation/')
    ) {
        const {name, ...rest} = state.scenarios[state.activeScenarioIdx];
        return {
            ...state,
            scenarios: [
                ...state.scenarios.slice(0, state.activeScenarioIdx),
                Object.assign(
                    {}, 
                    state.scenarios[state.activeScenarioIdx],
                    scenarioReducer(rest, action)
                ),
                ...state.scenarios.slice(state.activeScenarioIdx + 1)
            ]
        }
    }
    
    switch(action.type) {
        case ScenarioActionTypes.ADD_EMPTY_SCENARIO:
            return {
                ...state,
                scenarios:[
                    ...state.scenarios,
                    {
                        name: `Scenario-${state.scenarios.length+1}`,
                        stations:   { nextId: 1, data: {} },
                        routes:     { nextId: 1, data: {} },
                        vehicles:   { nextId: 1, data: {} },
                        passengers: { nextId: 1, tree: { 
                            0 : {id: 0, name: "All Passengers", children: []}
                        }},
                        simulation: {}
                    }
                ]
            };
        case ScenarioActionTypes.SET_SCENARIO_IDX:
            return action.payload? {
                ...state,
                activeScenarioIdx: action.payload.id
            }: state;
        case ScenarioActionTypes.SET_SCENARIO_STATE:
            return action.payload && action.payload.scenarios? {
                activeScenarioIdx: action.payload.id,
                scenarios: action.payload.scenarios
            }: state;
        case ScenarioActionTypes.SET_SCENARIO_NAME_BY_IDX:
            return action.payload? {
                ...state,
                scenarios: [
                    ...state.scenarios.slice(0, action.payload.id),
                    Object.assign(
                        {}, 
                        state.scenarios[state.activeScenarioIdx], 
                        {name: action.payload.name}
                    ),
                    ...state.scenarios.slice(action.payload.id + 1)
                ]
            }: state;
        default:
            return state
    }
}

export default scenarioStateReducer;;