import { combineReducers } from 'redux';

import InspectorReducer from './editor/components/rightPanel/components/inspectorView/reducer';
import CanvasReducer from './editor/components/workspace/components/pathfindingCanvas/reducer';
import LayoutReducer from './app/store/layout/reducers';
import ProjectReducer from './app/store/project/reducer';
import ScenarioReducer from './editor/reducer';
import ToastReducer from './toastManager/reducer';
import ModalReducer from './modalManager/reducer';

export const rootReducer = combineReducers({
    project: ProjectReducer,
    layout: LayoutReducer,
    scenario: ScenarioReducer,
    inspector: InspectorReducer,
    canvas: CanvasReducer,
    toasts: ToastReducer,
    modals: ModalReducer
});

export type AppState = ReturnType<typeof rootReducer>;