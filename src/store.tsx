import { combineReducers } from 'redux';

import LayoutReducer from './app/store/layout/reducers';
import ScenarioReducer from './editor/reducer';

export const rootReducer = combineReducers({
    layout: LayoutReducer,
    scenario: ScenarioReducer
});

export type AppState = ReturnType<typeof rootReducer>;