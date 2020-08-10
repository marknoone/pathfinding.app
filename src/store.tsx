import { combineReducers, Reducer } from 'redux';

import { ProjectState } from './app/store/project/constants';
import { LayoutState } from './app/store/layout/constants';
import { ScenarioState } from './editor/constants';
import { InspectorState } from './editor/components/rightPanel/components/inspectorView/constants';
import { ToastState } from './toastManager/constants';
import { ModalState } from './modalManager/constants';
import { CanvasState } from './editor/components/workspace/components/pathfindingCanvas/constants';
import InspectorReducer from './editor/components/rightPanel/components/inspectorView/reducer';
import CanvasReducer from './editor/components/workspace/components/pathfindingCanvas/reducer';
import LayoutReducer from './app/store/layout/reducers';
import ProjectReducer from './app/store/project/reducer';
import ScenarioReducer from './editor/reducer';
import ToastReducer from './toastManager/reducer';
import ModalReducer from './modalManager/reducer';

export type AppAction = {
    type: string,
    payload: { state?:AppState }
}

export enum AppActionTypes  {
    SET_PROJECT_STATE = "@global/SET_PROJECT_STATE"
}

export type AppState = {
    project: ProjectState,
    layout: LayoutState,
    scenario: ScenarioState,
    inspector: InspectorState,
    canvas: CanvasState,
    toasts: ToastState,
    modals: ModalState
};

const initialState = {
    project: ProjectReducer(undefined, {type: "", payload: {}}),
    layout: LayoutReducer(undefined, {type: "", payload: { val: true}}),
    scenario: ScenarioReducer(undefined, {type: "", payload: {}}),
    inspector: InspectorReducer(undefined, {type: "", payload: {elementID: 0, componentType: 0}}),
    canvas: CanvasReducer(undefined, {type: "", payload: { val: [] }}),
    toasts: ToastReducer(undefined, {type: "", payload: { val: ""}}),
    modals: ModalReducer(undefined, {type: "", payload: {type: 0, props: {}}})
}

const subReducers = combineReducers({
    project: ProjectReducer,
    layout: LayoutReducer,
    scenario: ScenarioReducer,
    inspector: InspectorReducer,
    canvas: CanvasReducer,
    toasts: ToastReducer,
    modals: ModalReducer
});

const GlobalReducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
    switch(action.type) {
        case AppActionTypes.SET_PROJECT_STATE:
            return action.payload.state?
                action.payload.state
                : state;
        default:
            return state;
    }
}


export const rootReducer: Reducer<AppState, any> = (state = initialState, action) => {
    if ( action.type.startsWith('@global/') ){
        return GlobalReducer(state, action);
    }

    return subReducers(state, action);
}


