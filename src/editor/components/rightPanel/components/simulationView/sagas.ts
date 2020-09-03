import { AppState } from '../../../../../store';
import { Scenario } from '../../../../constants';
import { SimulationActionTypes } from './constants';
import { DummySimulationResults } from './dummySimData';
import { takeLatest, select, put, call, take, delay, fork, actionChannel, all  } from 'redux-saga/effects';
import withMiddleware from '../../../../../app/pkg/simulation/middlewares';
import { CanvasState } from '../../../workspace/components/pathfindingCanvas/constants';
import Simulator, { FullSimData, FrameContainer, SaveSimulationResults, SimulationResults } 
    from '../../../../../app/pkg/simulation';
import { ProjectState } from '../../../../../app/store/project/constants';

export function* SimulationSaga() {
    yield takeLatest(SimulationActionTypes.SIMULATE_SCENARIO, function*(){
        yield all([
            call(InitialiseSimulation),
            call(SimulateActiveScenario)
        ]);
    });
}

function* InitialiseSimulation(){
    yield put({ type: SimulationActionTypes.INIT_SIMULATION });
    return;
}

function* SimulateActiveScenario() {
    yield take(SimulationActionTypes.INIT_SIMULATION);
    yield delay(500); // Allow for state update

    const canvas: CanvasState = yield select((s:AppState) => s.canvas);
    const proj: ProjectState = yield select((s:AppState) => s.project);
    const sIdx: ProjectState = yield select((s:AppState) => s.scenario.activeScenarioIdx);
    const s: Scenario = yield select((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx]);
    const simulator = new Simulator(s, canvas.boxSize, canvas.canvasSize);
    const { start, end } = s.simulation.options.simTimes;
    const {frames, results}: {frames: FrameContainer, results: SimulationResults} = yield call(
        [simulator, simulator.SimulateScenario], start, end
    );

    SaveSimulationResults(results, proj.id.toString(), sIdx.toString());
    
    yield put({
        type: SimulationActionTypes.COMPLETE_BAKE,
        payload: { frames: frames }
    });
} 


