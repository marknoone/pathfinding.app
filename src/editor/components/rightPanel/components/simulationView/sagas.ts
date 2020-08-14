import { takeLatest, select, put } from 'redux-saga/effects';
import { SimulationActionTypes, Graph, Algorithms } from './constants';
import { Passenger, isPassenger } from '../../../leftPanel/components/passengerView/constants';
import { Route, Station } from '../../../leftPanel/components/componentView/constants';
import { Scenario } from '../../../../constants';
import { AppState } from '../../../../../store';

// Algorithm Imports
import Dijkstra from './algorithms/dijkstra';
import TD_Dijkstra from './algorithms/td-dijkstra';
import MM_TD_Dijkstra from './algorithms/mm-td-dijkstra';
import CMT_Dijkstra from './algorithms/cmt-dijkstra';

export function* handleDijkstra() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, SimulateActiveScenario);

}

function* SimulateActiveScenario() {
    const { 
        stations: stationsObj, 
        routes: routeObj,
        vehicles: vehicleObj, 
        passengers: passengerObj, 
        simulation 
    }: Scenario = yield select((s:AppState) => s.scenario.scenarios[s.scenario.activeScenarioIdx]);

    // const passengers: Passenger[] = Object.keys(passengerObj.tree)
    //     .map((k: string) => { const p = passengerObj.tree[+k]; if(isPassenger(p)) return p; });
    // const stations: Station[] = Object.keys(stationsObj.data)
    //     .map((k: string) => { return stationsObj.data[+k]; });
    // const routes: Route[] = Object.keys(routeObj.data)
    //     .map((k: string) => { return routeObj.data[+k]; });

    switch(simulation.algorithm) {
        case Algorithms.Dijkstra: 
            break;
        case Algorithms.TimeDependentDijkstra: 
            break;
        case Algorithms.MultiModalTimeDependentDijkstra: 
            break;
        case Algorithms.CMTDijkstra: 
            break;
        default: 
            break;
    }
} 



const BuildGraph = () => {

    return {}
}