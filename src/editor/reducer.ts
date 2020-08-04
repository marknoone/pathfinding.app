import { combineReducers, Reducer } from 'redux';
import { Algorithms, Playspeed } from './components/rightPanel/components/simulationView/constants';
import PassengerReducer from './components/leftPanel/components/passengerView/reducer';
import SimulationReducer from './components/rightPanel/components/simulationView/reducer';
import { ScenarioState, ScenarioAction, ScenarioActionTypes } from './constants' 
import { PassengerTree } from './components/leftPanel/components/passengerView/constants';
import { TransitModes } from './components/leftPanel/components/componentView/constants';
import { RouteReducer, StationReducer,  VehicleReducer} 
    from './components/leftPanel/components/componentView/reducer';

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
        stations:   { nextId: 6, data: {
            1: { id: 1, name: "Station-1", colour: "#ff9f43", coordinates: {x: 50, y: 50} },
            2: { id: 2, name: "Station-2", colour: "#1dd1a1", coordinates: {x: 150, y: 150} },
            3: { id: 3, name: "Station-3", colour: "#ee5253", coordinates: {x: 250, y: 250} },
            4: { id: 4, name: "Station-4", colour: "#2e86de", coordinates: {x: 350, y: 350} },
            5: { id: 5, name: "Station-5", colour: "#1dd1a1", coordinates: {x: 450, y: 450} },
        }},
        
        routes:     { nextId: 3, data: {
            1: { id: 1, name: "Route-1", mode: TransitModes.BUS, color: "#1dd1a1", stations: [2, 5], departures: [40000] },
            2: { id: 2, name: "Route-2", mode: TransitModes.TRAIN, color: "#ee5253", stations: [1, 4], departures: [40000] },
        }},

        vehicles:   { nextId: 4, data: {
            1: { id: 1, name: "Vehicle-1", capacity: 32, glyph: "" },
            2: { id: 2, name: "Vehicle-2", capacity: 4,  glyph: "" },
            3: { id: 3, name: "Vehicle-3", capacity: 16, glyph: "" },
        }},

        passengers: { nextId: 6, tree: {
            0 : {id: 0, name: "All Passengers", children: [1, 2, 3]},

            1 : {id: 1, name: "Passenger-1", start: {x: 25, y: 25}, destination: {x: 75, y: 75}, tod: 38000},
            2 : {id: 2, name: "Passenger-2", start: {x: 125, y: 125}, destination: {x: 175, y: 175}, tod: 39000},
            3 : {id: 3, name: "Batch-1", children: [4, 5]},
            
            4 : {id: 4, name: "Passenger-3", start: {x: 225, y: 225}, destination: {x: 275, y: 275}, tod: 34000},
            5 : {id: 5, name: "Passenger-4", start: {x: 325, y: 325}, destination: {x: 375, y: 375}, tod: 32000},
        } as PassengerTree },

        simulationConfig: {
            isPlaying: false,
            simFrame: 1,
            algorithm: Algorithms.Dijkstra,
            playSpeed: 1 as Playspeed
        }
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
                        stations:   {},
                        routes:     {},
                        vehicles:   {},
                        passengers: {},
                        simulationConfig: {}
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