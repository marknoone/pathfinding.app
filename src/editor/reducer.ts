import { combineReducers, Reducer } from 'redux';
import { Algorithms } from './components/rightPanel/components/simulationView/constants';
import PassengerReducer from './components/leftPanel/components/passengerView/reducer';
import SimulationReducer from './components/rightPanel/components/simulationView/reducer';
import { ScenarioState, ScenarioAction, ScenarioActionTypes } from './constants' 
import { PassengerTree, Passenger } from './components/leftPanel/components/passengerView/constants';
import { TransitModes, ColourSet, Colours, StationDataObj, RouteDataObj, VehicleDataObj } from './components/leftPanel/components/componentView/constants';
import { initialState as SimulationInitialState} from './components/rightPanel/components/simulationView/reducer';
import { RouteReducer, StationReducer,  VehicleReducer} 
    from './components/leftPanel/components/componentView/reducer';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

const scenarioReducer = combineReducers({
    stations:   StationReducer,
    routes:     RouteReducer,
    vehicles:   VehicleReducer,
    passengers: PassengerReducer,
    simulation: SimulationReducer,
});

const dummyStnDataObj: StationDataObj = {
    1:{ id: 1, name: "Station-1", isLocked: false, coordinates: {x: 400, y: 400}},
    2:{ id: 2, name: "Station-2", isLocked: false, coordinates: {x: 500, y: 500}},
    3:{ id: 3, name: "Station-3", isLocked: false, coordinates: {x: 600, y: 600}}
}

const dummyRouterDataObj: RouteDataObj = {
    1:{ 
        id: 1, name: "Route-1", vehicleID: 1, isLocked: false, mode: TransitModes.BUS, 
        color: Colours.AMOUR, stations: {}, departures: {} 
    },
    2:{ 
        id: 2, name: "Route-2", vehicleID: 1, isLocked: false, mode: TransitModes.BUS, 
        color: Colours.AMOUR, stations: {}, departures: {} 
    },
    3:{ 
        id: 3, name: "Route-3", vehicleID: 1, isLocked: false, mode: TransitModes.BUS, 
        color: Colours.AMOUR, stations: {}, departures: {} 
    }
}

const dummyVehicleDataObj: VehicleDataObj = {
    1:{ 
        id: 1, name: "Vehicle-1", isLocked: false, capacity: 6, glyph: faArchive, 
        LOS: { A: 0, B: 1, C:2, D:3, E:4, F:5 }
    },
    2:{ 
        id: 2, name: "Vehicle-2", isLocked: false, capacity: 6, glyph: faArchive, 
        LOS: { A: 0, B: 1, C:2, D:3, E:4, F:5 }
    },
}

const dummyPassenger: Passenger = {
    id: 1, 
    name: "Passenger", 
    tod: 400, 
    start: {x: 380, y: 380}, 
    destination: {x: 580, y: 580},
    isLocked: false
}

export const initialState = {
    activeScenarioIdx: 0,
    scenarios: [{
        name: "Scenario-1",
        stations:   { nextId: 2, data: dummyStnDataObj },
        routes:     { nextId: 2, data: dummyRouterDataObj},
        vehicles:   { nextId: 2, data: dummyVehicleDataObj},

        passengers: { nextId: 2, tree: {
            0 : {id: 0, name: "All Passengers", children: []},
            1 : dummyPassenger,
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