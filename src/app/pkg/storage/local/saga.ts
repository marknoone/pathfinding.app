import { takeLatest, takeEvery, select, put } from 'redux-saga/effects';
import { AppState } from '../../../../store';
import { AddErrorToastNotification } from '../../../../toastManager/actions'; 
import { ProjectAction } from '../../../store/project/constants';
import { 
    renameProjectInLocalStore,
    saveToLocalStore 
} from './localStorage';

export function* LocalStoreSaga() {
    yield takeLatest('@project/SAVE_PROJECT', SaveToLocalStoreSaga)
    yield takeEvery('@project/SET_PROJECT_NAME', RenameLocalStoreProject)
}

export function* RenameLocalStoreProject(action:ProjectAction) {
    const from = yield select((s:AppState) => s.project.name);
    console.log(from);
    const to = action.payload.name

    if(to) {
        renameProjectInLocalStore(from, to);
    }
}


export function* SaveToLocalStoreSaga(){
    // Toast and modal state not saved in local store.
    const {toasts, modals, ...state} = yield select((s:AppState) => s);
    
    try { saveToLocalStore(state.project.name, state); }
    catch(err) {
        yield put(AddErrorToastNotification(`
            An error occured while saving to local storage.
            Check your console for more information.
        `));
        console.error('Local store err: ', err)
    }
}
