import { createSelector } from 'reselect';
import { ScenarioState } from '../../../../constants';
import { PassengerState, PassengerTree } from './constants';

const getPassengerState = (state: ScenarioState) => state.scenarios[state.activeScenarioIdx].passengers
export const getVehicles = createSelector<ScenarioState, PassengerState, PassengerTree>(
    [getPassengerState],
    (s: PassengerState) => s.tree
);