import { SimulationAction, SimulationActionType } from './constants';

export const SimulateScenario = ():SimulationAction => ({
    type: SimulationActionType.SIMULATE_SCENARIO
})

export const BakeScenario = ():SimulationAction => ({
    type: SimulationActionType.BAKE_SCENARIO
})