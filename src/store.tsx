import { combineReducers } from 'redux';

import LayoutReducer from './app/store/layout/reducers';
import PassengerReducer from './editor/components/leftPanel/components/passengerView/reducer';

export const rootReducer = combineReducers({
    layout: LayoutReducer,
    passengers: PassengerReducer
});

export type AppState = ReturnType<typeof rootReducer>;