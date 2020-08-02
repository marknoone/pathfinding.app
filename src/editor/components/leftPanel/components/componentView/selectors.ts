import { createSelector } from 'reselect';
import { 
    StationsState, RoutesState, VehiclesState,
    StationDataObj, RouteDataObj, VehicleDataObj,
} from './constants';
import { AppState } from '../../../../../store';


const getVehicleState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].vehicles
export const getVehicles = createSelector<AppState, VehiclesState, VehicleDataObj>(
    [getVehicleState],
    (s: VehiclesState) => s.data
);

export const makeGetVehicleByIDSelector = () => createSelector(
    [ getVehicleState, (_: any, id:number) => id ],
    (s: VehiclesState, id) => s.data[id]
);


const getRouteState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].routes
export const getRoutes = createSelector<AppState, RoutesState, RouteDataObj>(
    [getRouteState],
    (s: RoutesState) => s.data
);

export const makeGetRouteByIDSelector = () => createSelector(
    [ getRouteState, (_: any, id:number) => id ],
    (s: RoutesState, id) => s.data[id]
);


const getStationState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].stations
export const getStations = createSelector<AppState, StationsState, StationDataObj>(
    [getStationState],
    (s: StationsState) => s.data
);

export const makeGetStationByIDSelector = () => createSelector(
    [ getStationState, (_: any, id:number) => id ],
    (s: StationsState, id) => s.data[id]
);