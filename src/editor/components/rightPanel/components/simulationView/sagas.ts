import { AppState } from '../../../../../store';
import { Scenario } from '../../../../constants';
import { SimulationActionTypes } from './constants';
import { DummySimulationResults } from './dummySimData';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import withMiddleware from '../../../../../app/pkg/simulation/middlewares';
import ExampleMiddleware from '../../../../../app/pkg/simulation/middlewares/example';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import Simulator, { FullSimData, FrameContainer, SaveSimulationResults } 
    from '../../../../../app/pkg/simulation';

export function* SimulationSaga() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, SimulateActiveScenario);
}



function* SimulateActiveScenario() {
    // yield put({ type: SimulationActionTypes.INIT_SIMULATION });

    // const canvas: CanvasState = yield select((s:AppState) => s.canvas);
    // const s: Scenario = yield select((s:AppState) => 
    //     s.scenario.scenarios[s.scenario.activeScenarioIdx]);
    // const simulator = new Simulator(s, canvas.boxSize, canvas.canvasSize);
    
    // const frames: FrameContainer = yield call(
    //     simulator.SimulateScenario, 
    //     withMiddleware({ "EXAMPLE" : ExampleMiddleware})
    // );

    SaveSimulationResults(DummySimulationResults, "0", "1");

    // yield put({
    //     type: SimulationActionTypes.COMPLETE_BAKE,
    //     payload: { frames: frames }
    // });
} 


