import { takeLatest, select, put, call } from 'redux-saga/effects';
import { SimulationActionTypes } from './constants';
import { Scenario } from '../../../../constants';
import { AppState } from '../../../../../store';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import Simulator, { FullSimData } from '../../../../../app/pkg/simulation';
import withMiddleware from '../../../../../app/pkg/simulation/middlewares';
import ExampleMiddleware from '../../../../../app/pkg/simulation/middlewares/example';

export function* SimulationSaga() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, SimulateActiveScenario);
}

function* SimulateActiveScenario() {
    yield put({ type: SimulationActionTypes.INIT_SIMULATION });

    const canvas: CanvasState = yield select((s:AppState) => s.canvas);
    const s: Scenario = yield select((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx]);
    const simulator = new Simulator(s, canvas.boxSize, canvas.canvasSize);
    
    const simData: (FullSimData | null) = yield call(
        simulator.SimulateScenario, 
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


