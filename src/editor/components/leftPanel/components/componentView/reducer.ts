import { Reducer } from 'redux';
import {
    VehicleAction, StationAction, RouteAction,
    VehiclesState, StationsState, RoutesState,
    VehicleActionTypes, StationActionTypes, RouteActionTypes,
} from './constants';

const initialVehicleState = { nextIdx: 0, data: {} }
export const VehicleReducer: Reducer<VehiclesState, VehicleAction> = (state = initialVehicleState, action) => {
    switch(action.type) {
        case VehicleActionTypes.ADD_NEW_VEHICLE:
            return action.payload.obj? {
                nextIdx: state.nextIdx+1,
                data: {
                    ...state.data,
                    [action.payload.id]: action.payload.obj
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

const initialStationState = { nextIdx: 0, data: {} }
export const StationReducer: Reducer<StationsState, StationAction> = (state = initialStationState, action) => {
    switch(action.type) {
        case StationActionTypes.ADD_NEW_STATION:
            return action.payload.obj? {
                nextIdx: state.nextIdx+1,
                data: {
                    ...state.data,
                    [action.payload.id]: action.payload.obj
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

const initialRouteState = { nextIdx: 0, data: {} }
export const RouteReducer: Reducer<RoutesState, RouteAction> = (state = initialRouteState, action) => {
    switch(action.type) {
        case RouteActionTypes.ADD_NEW_ROUTE:
            return action.payload.obj? {
                nextIdx: state.nextIdx+1,
                data: {
                    ...state.data,
                    [action.payload.id]: action.payload.obj
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
