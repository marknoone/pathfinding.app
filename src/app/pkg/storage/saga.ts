import { takeLatest, select, put, call, take } from 'redux-saga/effects';
import { AppState, AppActionTypes } from '../../../store';
import { ProjectAction, ProjectActionTypes } from '../../store/project/constants';
import { DefaultLocalStorage } from './localStorage';

export function* LocalStoreSaga() {
    yield takeLatest(ProjectActionTypes.SAVE_PROJECT, SaveToLocalStoreSaga);
    yield takeLatest(ProjectActionTypes.LOAD_PROJECT, LoadFromLocalStoreSaga);
    yield takeLatest(ProjectActionTypes.SET_PROJECT_NAME, SetLocalStoreProjectName);
    yield takeLatest(ProjectActionTypes.SET_PROJECT_LAST_EDIT, SetLocalStoreProjectLastEdit);
    yield takeLatest(ProjectActionTypes.CREATE_NEW_PROJECT, CreateNewProjectInLocalStoreSaga);
}

export function* SetLocalStoreProjectName(action:ProjectAction) {
    const name = action.payload.name;
    if(name){
        const id = yield select((s:AppState) => s.project.id);
        DefaultLocalStorage.SetProjectNameByID(id, name);
    }
}

export function* SetLocalStoreProjectLastEdit(action:ProjectAction) {
    const edit = action.payload.lastEdited;
    if(edit){
        const id = yield select((s:AppState) => s.project.id);
        DefaultLocalStorage.SetProjectLastEditByID(id, edit);
    }
}

export function* SaveToLocalStoreSaga(){
    // Toast and modal state not saved in local store.
    const {toasts, modals, project, ...state} = yield select((s:AppState) => s);
    DefaultLocalStorage.SaveProjectByID(project.id, state);
}

export function* CreateNewProjectInLocalStoreSaga(action:ProjectAction){
    if(action.payload.name){
        const newID = DefaultLocalStorage.AddNewProject(action.payload.name);
        put({type: ProjectActionTypes.SET_PROJECT_ID, payload: { id: newID }})
    }
}

export function* LoadFromLocalStoreSaga(action:ProjectAction){
    if(action.payload.id){
        const state = yield select((s:AppState) => s);
        const proj = yield DefaultLocalStorage.GetProjectDataByID(action.payload.id);
        console.log(proj);
        if(proj)
            yield put({type: AppActionTypes.SET_PROJECT_STATE, payload: { state: {
                ...state,
                ...proj
            }}});
    }
}
