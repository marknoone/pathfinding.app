import { takeLatest, select, put, call, take } from 'redux-saga/effects';
import { AppState, AppActionTypes } from '../../../store';
import FetchPreset from './preset';
import { StationReducer } from '../../../editor/components/leftPanel/components/componentView/reducer';

export type PresetAction = {
    type: string,
    payload: {url: string}
}

export enum PresetActionTypes {
    SET_STATE_FROM_PRESET = "@preset/SET_STATE_FROM_PRESET"
}

function* PresetSaga() {
    yield takeLatest(PresetActionTypes.SET_STATE_FROM_PRESET, FetchAndSetPreset);
}

export function* FetchAndSetPreset(action:PresetAction) {
    const state = yield select((s:AppState) => s);
    const data = yield FetchPreset(action.payload.url);

    if(data)
        put({
            type: AppActionTypes.SET_PROJECT_STATE, 
            payload: { 
                state: {
                ...state,
                ...data 
                }
            }
        })
}

export default PresetSaga;