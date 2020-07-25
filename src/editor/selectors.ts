import { createSelector } from 'reselect';
import { ScenarioState, Scenario } from './constants'

const getScenarios = (state: ScenarioState) => state.scenarios
const getActiveScenarioIdx = (state: ScenarioState) => state.activeScenarioIdx

export const getActiveScenario = createSelector<ScenarioState, number, Scenario[], Scenario>(
    [getActiveScenarioIdx, getScenarios],
    (idx: number, scenarios: Scenario[])=>{
        return scenarios[idx];
    }
)