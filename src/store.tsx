import { combineReducers } from 'redux';

import InspectorReducer from './editor/components/rightPanel/components/inspectorView/reducer';
import LayoutReducer from './app/store/layout/reducers';
import ScenarioReducer from './editor/reducer';

export const rootReducer = combineReducers({
    layout: LayoutReducer,
    scenario: ScenarioReducer,
    inspector: InspectorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;