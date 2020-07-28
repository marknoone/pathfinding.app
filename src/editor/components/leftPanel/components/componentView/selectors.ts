import { createSelector } from 'reselect';
import { ScenarioState } from '../../../../constants';
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


const getRouteState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].routes
export const getRoutes = createSelector<AppState, RoutesState, RouteDataObj>(
    [getRouteState],
    (s: RoutesState) => s.data
);


const getStationState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].stations
export const getStations = createSelector<AppState, StationsState, StationDataObj>(
    [getStationState],
    (s: StationsState) => s.data
);