import { all } from 'redux-saga/effects'
import { LocalStoreSaga } from './app/pkg/storage';
import { PresetSaga } from './app/pkg/presets';

function* rootSaga() {
    yield all([
        LocalStoreSaga(),
        PresetSaga()
    ])
}
  
export default rootSaga;