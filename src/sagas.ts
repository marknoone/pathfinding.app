import { all } from 'redux-saga/effects'
import { LocalStoreSaga } from './app/pkg/storage';
import { PresetSaga } from './app/pkg/presets';
import { SimulationSaga } from './editor/components/rightPanel/components/simulationView/sagas';

function* rootSaga() {
    yield all([
        LocalStoreSaga(),
        PresetSaga(),
        SimulationSaga()
    ])
}
  
export default rootSaga;