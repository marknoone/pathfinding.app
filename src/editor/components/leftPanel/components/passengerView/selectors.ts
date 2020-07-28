import { createSelector } from 'reselect';
import { AppState } from '../../../../../store';
import { PassengerState, PassengerTree, Passenger, PassengerDirectory, isPassengerDirectory } from './constants';

const getPassengerState = (state: AppState) => state.scenario.scenarios[state.scenario.activeScenarioIdx].passengers
export const getPassengerTree = createSelector<AppState, PassengerState, PassengerTree>(
    [getPassengerState],
    (s: PassengerState) => s.tree
);

export const makeGetPassengerElemByIDSelector = () => createSelector(
        [ getPassengerState, (_: any, id:number) => id ],
        (s: PassengerState, id) => s.tree[id]
);

export const makeGetChildElemsByIDSelector = () => createSelector(
        [ getPassengerState, (_: any, id:number) => id ],
        (s: PassengerState, id) => {
            const item = s.tree[id]
            if(isPassengerDirectory(item)) {
                return item.children.map((idx: number) => s.tree[idx])
            } else {
                return []
            }
        }
);