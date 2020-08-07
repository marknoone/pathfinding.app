import { all } from 'redux-saga/effects'
import { LocalStoreSaga } from './app/pkg/storage';

function* rootSaga() {
    yield all([
        LocalStoreSaga()
    ])
}
  
export default rootSaga;