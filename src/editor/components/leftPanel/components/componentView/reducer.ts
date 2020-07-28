import { Reducer } from 'redux';
import {
    VehicleAction, StationAction, RouteAction,
    VehiclesState, StationsState, RoutesState,
    VehicleActionTypes, StationActionTypes, RouteActionTypes, TransitModes,
} from './constants';

const initialVehicleState = { nextId: 0, data: {} }
export const VehicleReducer: Reducer<VehiclesState, VehicleAction> = (state = initialVehicleState, action) => {
    switch(action.type) {
        case VehicleActionTypes.ADD_NEW_EMPTY_VEHICLE:
            return {
                nextId: state.nextId+1,
                data: {
                    ...state.data,
                    [state.nextId]: {
                        id: state.nextId,
                        name: `Vehicle-${state.nextId}`,
                        capacity: 0,
                        glyph: ""
                    }
                }
            };
        case VehicleActionTypes.ADD_NEW_VEHICLE:
            return action.payload.obj? {
                nextId: state.nextId+1,
                data: {
                    ...state.data,
                    [state.nextId]: {
                        ...action.payload.obj,
                        id: state.nextId
                    }
                }
            }: state;
        case VehicleActionTypes.DELETE_VEHICLE:
            const {[action.payload.id]: val, ...rest} = state.data
            return { ...state, data: rest };
        case VehicleActionTypes.UPDATE_VEHICLE:
            return action.payload.obj?{
                ...state,
                data:{
                    ...state.data,
                    [action.payload.id]: action.payload.obj
                }
            }: state;
        default:
            return state;
    }
}

const initialStationState = { nextId: 0, data: {} }
export const StationReducer: Reducer<StationsState, StationAction> = (state = initialStationState, action) => {
    switch(action.type) {
        case StationActionTypes.ADD_NEW_EMPTY_STATION:
            return {
                nextId: state.nextId+1,
                data: {
                    ...state.data,
                    [state.nextId]: {
                        id: state.nextId,
                        name: `Station-${state.nextId}`,
                        colour: "#464646",
                        nodeID: 0
                    }
                }
            };
        case StationActionTypes.ADD_NEW_STATION:
            return action.payload.obj? {
                nextId: state.nextId+1,
                data: {
                    ...state.data,
                    [state.nextId]: {
                        ...action.payload.obj,
                        id: state.nextId
                    }
                }
            }: state;
        case StationActionTypes.DELETE_STATION:
            const {[action.payload.id]: val, ...rest} = state.data
            return { ...state, data: rest };
        case StationActionTypes.UPDATE_STATION:
            return action.payload.obj?{
                ...state,
                data:{
                    ...state.data,
                    [action.payload.id]: action.payload.obj
                }
            }: state;
        default:
            return state;
    }
}

const initialRouteState = { nextId: 0, data: {} }
export const RouteReducer: Reducer<RoutesState, RouteAction> = (state = initialRouteState, action) => {
    switch(action.type) {
        case RouteActionTypes.ADD_NEW_EMPTY_ROUTE:
            return {
                nextId: state.nextId+1,
                data: {
                    ...state.data,
                    [state.nextId]: {
                        id: state.nextId,
                        name: `Route-${state.nextId}`,
                        mode: TransitModes.BUS,
                        color: "#000",
                    
                        stations: [],
                        departures: [],
                    }
                }
            };
        case RouteActionTypes.ADD_NEW_ROUTE:
            return action.payload.obj? {
                nextId: state.nextId+1,
                data: {
                    ...state.data,
                    [state.nextId]: {
                        ...action.payload.obj,
                        id: state.nextId
                    }
                }
            }: state;
        case RouteActionTypes.DELETE_ROUTE:
            const {[action.payload.id]: val, ...rest} = state.data
            return { ...state, data: rest };
        case RouteActionTypes.UPDATE_ROUTE:
            return action.payload.obj?{
                ...state,
                data:{
                    ...state.data,
                    [action.payload.id]: action.payload.obj
                }
            }: state;
        default:
            return state;
    }
}
