import { takeLatest, select, put } from 'redux-saga/effects';
import { SimulationActionTypes, Graph, Algorithms, Path } from './constants';
import { Passenger, isPassenger } from '../../../leftPanel/components/passengerView/constants';
import { Route, Station } from '../../../leftPanel/components/componentView/constants';
import { Scenario } from '../../../../constants';
import { AppState } from '../../../../../store';

// Algorithm Imports
import Dijkstra from './algorithms/dijkstra';
import TD_Dijkstra from './algorithms/td-dijkstra';
import MM_TD_Dijkstra from './algorithms/mm-td-dijkstra';
import CMT_Dijkstra from './algorithms/cmt-dijkstra';
import { getGraph, findNodeWithCoordinates } from './selectors';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';

export function* handleDijkstra() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, SimulateActiveScenario);

}

function* SimulateActiveScenario() {
    const graph: Graph = yield select((s:AppState) => getGraph(s));
    const canvas: CanvasState = yield select((s:AppState) => s.canvas);
    const { simulation, passengers, ...rest }: Scenario
        = yield select((s:AppState) => s.scenario.scenarios[s.scenario.activeScenarioIdx]);
    const GetPath = ( start: number, dest: number, depTime: number, alg: Algorithms, g:Graph): Path => {
        switch(alg) {
            case Algorithms.Dijkstra: 
                return Dijkstra.Execute(start, dest, depTime, g);
            case Algorithms.TimeDependentDijkstra: 
                return TD_Dijkstra.Execute(start, dest, depTime, g);
            case Algorithms.MultiModalTimeDependentDijkstra: 
                return MM_TD_Dijkstra.Execute(start, dest, depTime, g);
            case Algorithms.CMTDijkstra: 
                return CMT_Dijkstra.Execute(start, dest, depTime, g);
            default: 
                return [];
        }
    }

    const activePassengers =  Object.keys(passengers.tree)
        .filter((key:string) => isPassenger(passengers.tree[+key]))
        .map((key: string) => {
            const p = passengers.tree[+key] as Passenger;
            const startNodeID = findNodeWithCoordinates(graph, canvas.boxSize, canvas.canvasSize, p.start); 
            const destNodeID = findNodeWithCoordinates(graph, canvas.boxSize, canvas.canvasSize, p.destination); 
            if(!startNodeID || !destNodeID) return {}
            return {
                currentMode: null,
                currentVehicle: null,
                lastStatusChg: 0,
                status: "NOTREADY",
            
                destNode: p.destination,
                coords: {x: 0, y: 0},
                path: GetPath(startNodeID, destNodeID, p.tod, simulation.algorithm, graph),
            }
        })
    
    console.log(activePassengers);
} 