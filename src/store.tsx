import { combineReducers } from 'redux';

import LayoutReducer from './app/store/layout/reducers';

export const rootReducer = combineReducers({
    layout: LayoutReducer
});

export type AppState = ReturnType<typeof rootReducer>;