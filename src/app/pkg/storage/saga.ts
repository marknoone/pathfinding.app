import { takeLatest, select, put, call, take } from 'redux-saga/effects';
import { AppState, AppActionTypes } from '../../../store';
import { ProjectAction, ProjectActionTypes, ProjectSummary, ProjectData } from '../../store/project/constants';
import { DefaultLocalStorage } from './localStorage';
import { initialState as LayoutInitial } from '../../../app/store/layout/reducers';
import { initialState as ScenarioInitial } from '../../../editor/reducer';
import { initialState as InspectorInitial } from '../../../editor/components/rightPanel/components/inspectorView/reducer';
import { initialState as ToastInitial } from '../../../toastManager/reducer';
import { initialState as ModalInitial } from '../../../modalManager/reducer';
import { initialState as CanvasInitial } from '../../../editor/components/workspace/components/pathfindingCanvas/reducer';

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
    const {toasts, modals, project, layout, ...state} = yield select((s:AppState) => s);
    DefaultLocalStorage.SaveProjectByID(project.id, state);
    yield put({type: ProjectActionTypes.SET_PROJECT_LAST_EDIT, payload: { lastEdited: Date.now() }})
}

export function* CreateNewProjectInLocalStoreSaga(action:ProjectAction){
    if(action.payload.name){
        const proj = DefaultLocalStorage.AddNewProject(action.payload.name);
        yield put({type: AppActionTypes.SET_PROJECT_STATE, payload: { state: {
            project: {...proj},
            layout: LayoutInitial,
            scenario: ScenarioInitial,
            inspector: InspectorInitial,
            canvas: CanvasInitial,
            toasts: ToastInitial,
            modals: ModalInitial
        }}})
    }
}

export function* LoadFromLocalStoreSaga(action:ProjectAction){
    if(action.payload.id){
        const state = yield select((s:AppState) => s);
        const proj = yield DefaultLocalStorage.GetProjectDataByID(action.payload.id);
        const summaries = yield DefaultLocalStorage.GetProjectSummaries() as ProjectSummary[];
        const summary = summaries.find((s: ProjectSummary) => s.id == action.payload.id);
        yield put({type: AppActionTypes.SET_PROJECT_STATE, payload: { state: {
            ...state,
            ...proj,
            project: summary? {...summary}:{...state.project},
        }}});
    }
}
