import { AppState } from '../../../../../store';
import { Scenario } from '../../../../constants';
import { SimulationActionTypes } from './constants';
import { DummySimulationResults } from './dummySimData';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import withMiddleware from '../../../../../app/pkg/simulation/middlewares';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import Simulator, { FullSimData, FrameContainer, SaveSimulationResults, SimulationResults } 
    from '../../../../../app/pkg/simulation';
import { ProjectState } from '../../../../../app/store/project/constants';

export function* SimulationSaga() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, SimulateActiveScenario);
}



function* SimulateActiveScenario() {
    yield put({ type: SimulationActionTypes.INIT_SIMULATION });

    const canvas: CanvasState = yield select((s:AppState) => s.canvas);
    const proj: ProjectState = yield select((s:AppState) => s.project);
    const sIdx: ProjectState = yield select((s:AppState) => s.scenario.activeScenarioIdx);
    const s: Scenario = yield select((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx]);
    const simulator = new Simulator(s, canvas.boxSize, canvas.canvasSize);
    
    const {frames, results}: {frames: FrameContainer, results: SimulationResults} = yield call(
        simulator.SimulateScenario
    );

    SaveSimulationResults(results, proj.id.toString(), sIdx.toString());

    yield put({
        type: SimulationActionTypes.COMPLETE_BAKE,
        payload: { frames: frames }
    });
} 


