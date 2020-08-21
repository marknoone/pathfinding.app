import { takeLatest, select, put, call } from 'redux-saga/effects';
import { SimulationActionTypes, CoordEvalFunc, FullSimData } from './constants';
import { Scenario } from '../../../../constants';
import { AppState } from '../../../../../store';
import { getGraph, findNodeWithCoordinates } from './selectors';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import { SimulateScenario, Graph } from './simulation';
import withMiddleware from './middlewares';
import ExampleMiddleware from './middlewares/example';

export function* SimulationSaga() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, SimulateActiveScenario);
}

function* SimulateActiveScenario() {
    // Update UI
    yield put({ type: SimulationActionTypes.INIT_SIMULATION });

    const graph: Graph = yield select((s:AppState) => getGraph(s));
    const canvas: CanvasState = yield select((s:AppState) => s.canvas);
    const { simulation, passengers, ...rest }: Scenario
        = yield select((s:AppState) => s.scenario.scenarios[s.scenario.activeScenarioIdx]);
    const getNodeAtCoord = (g: Graph, c: CanvasState):CoordEvalFunc => 
        (coords: {x:number, y:number}):(number|null) => 
            findNodeWithCoordinates(g, c.boxSize, c.canvasSize, coords);

    
    const simData: (FullSimData | null) = yield call(
        SimulateScenario, 
        graph, 
        simulation.options, 
        getNodeAtCoord(graph, canvas),
        withMiddleware({ "EXAMPLE" : ExampleMiddleware})
    );

    if(simData) {
        yield put({
            type: SimulationActionTypes.COMPLETE_BAKE,
            payload: {
                data: simData
            }
        });
    }
} 

