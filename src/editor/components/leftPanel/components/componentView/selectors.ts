import { createSelector } from 'reselect';
import { ScenarioState } from '../../../../constants';
import { 
    StationsState, RoutesState, VehiclesState,
    StationDataObj, RouteDataObj, VehicleDataObj,
} from './constants';


const getVehicleState = (state: ScenarioState) => state.scenarios[state.activeScenarioIdx].vehicles
export const getVehicles = createSelector<ScenarioState, VehiclesState, VehicleDataObj>(
    [getVehicleState],
    (s: VehiclesState) => s.data
);


const getRouteState = (state: ScenarioState) => state.scenarios[state.activeScenarioIdx].routes
export const getRoutes = createSelector<ScenarioState, RoutesState, RouteDataObj>(
    [getRouteState],
    (s: RoutesState) => s.data
);


const getStationState = (state: ScenarioState) => state.scenarios[state.activeScenarioIdx].stations
export const getStations = createSelector<ScenarioState, StationsState, StationDataObj>(
    [getStationState],
    (s: StationsState) => s.data
);