import { createSelector } from 'reselect';
import { AppState } from '../../../../../store';
import { PassengerState, PassengerTree, Passenger, PassengerDirectory } from './constants';
import { IDProps } from './passengerView';

const getPassengerState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].passengers
export const getPassengerTree = createSelector<AppState, PassengerState, PassengerTree>(
    [getPassengerState],
    (s: PassengerState) => s.tree
);

export const makeGetPassengerElemByIDPropsSelector = () => createSelector(
        [ getPassengerState, (_: any, id:number) => id ],
        (s: PassengerState, id) => s.tree[id]
);