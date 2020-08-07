import { ScenarioActionTypes, ScenarioAction, Scenario } from './constants';
import { identity } from 'lodash';

export const AddEmptyScenario = ():ScenarioAction => ({
    type: ScenarioActionTypes.ADD_EMPTY_SCENARIO,
})

export const SetScenarioNameByIdx = (id: number, name: string):ScenarioAction => ({
    type: ScenarioActionTypes.SET_SCENARIO_NAME_BY_IDX,
    payload: {id: id, name: name}
})

export const SetActiveScenario = (idx: number):ScenarioAction => ({
    type: ScenarioActionTypes.SET_SCENARIO_IDX,
    payload: {id: idx}
})

export const SetScenarioState = (activeID: number, scenarios: Scenario[]):ScenarioAction => ({
    type: ScenarioActionTypes.SET_SCENARIO_STATE,
    payload: {id: activeID, scenarios: scenarios}
})