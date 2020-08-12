import { 
    Vehicle, Station, Route,
    VehicleAction, StationAction, RouteAction,
    VehicleActionTypes, StationActionTypes, RouteActionTypes,
} from './constants';

// Vehicle Actions -----------------------------------------------------------
export const AddEmptyVehicleComponent = ():VehicleAction => ({
    type: VehicleActionTypes.ADD_NEW_EMPTY_VEHICLE,
    payload: {id: 0}
})

export const AddVehicleComponent = (val: Vehicle):VehicleAction => ({
    type: VehicleActionTypes.ADD_NEW_VEHICLE,
    payload: {id: val.id, obj: val}
})

export const DeleteVehicleWithID = (id: number):VehicleAction => ({
    type: VehicleActionTypes.DELETE_VEHICLE,
    payload: {id: id}
})

export const UpdateVehicleByID = (val: Vehicle):VehicleAction => ({
    type: VehicleActionTypes.UPDATE_VEHICLE,
    payload: {id: val.id, obj: val}
})

// Station Actions -----------------------------------------------------------
export const AddEmptyStationComponent = ():StationAction => ({
    type: StationActionTypes.ADD_NEW_EMPTY_STATION,
    payload: {id: 0}
})

export const AddStationComponent = (val: Station):StationAction => ({
    type: StationActionTypes.ADD_NEW_STATION,
    payload: {id: val.id, obj: val}
})

export const DeleteStationWithID = (id: number):StationAction => ({
    type: StationActionTypes.DELETE_STATION,
    payload: {id: id}
})

export const UpdateStationByID = (val: Station):StationAction => ({
    type: StationActionTypes.UPDATE_STATION,
    payload: {id: val.id, obj: val}
})

// Route Actions -----------------------------------------------------------
export const AddEmptyRouteComponent = ():RouteAction => ({
    type: RouteActionTypes.ADD_NEW_EMPTY_ROUTE,
    payload: {id: 0}
})

export const AddRouteComponent = (val: Route):RouteAction => ({
    type: RouteActionTypes.ADD_NEW_ROUTE,
    payload: {id: val.id, obj: val}
})

export const DeleteRouteWithID = (id: number):RouteAction => ({
    type: RouteActionTypes.DELETE_ROUTE,
    payload: {id: id}
})

export const UpdateRouteByID = (val: Route):RouteAction => ({
    type: RouteActionTypes.UPDATE_ROUTE,
    payload: {id: val.id, obj: val}
})

