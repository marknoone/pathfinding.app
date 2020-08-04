import { ScenarioActionTypes, ScenarioAction, Scenario } from './constants';

export const AddEmptyScenario = ():ScenarioAction => ({
    type: ScenarioActionTypes.ADD_EMPTY_SCENARIO,
})

export const SetActiveScenario = (idx: number):ScenarioAction => ({
    type: ScenarioActionTypes.SET_SCENARIO_IDX,
    payload: {id: idx}
})

export const SetScenarioState = (activeID: number, scenarios: Scenario[]):ScenarioAction => ({
    type: ScenarioActionTypes.SET_SCENARIO_STATE,
    payload: {id: activeID, scenarios: scenarios}
})