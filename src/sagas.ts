import { all } from 'redux-saga/effects'
import { SaveToLocalStore } from './app/pkg/storage';

function* rootSaga() {
    yield all([
        SaveToLocalStore()
    ])
}
  
export default rootSaga;