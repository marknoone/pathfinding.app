import { takeLatest } from 'redux-saga/effects';

function* saveProject(){
    console.log("Hello world!");
}

function* saveToLocalStore() {
    yield takeLatest('@project/SAVE_PROJECT', saveProject)
}

export default saveToLocalStore;