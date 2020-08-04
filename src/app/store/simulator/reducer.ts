import { Reducer } from 'redux';
import { SimulationState, SimulationAction, SimulationActionType } from './constants'

const initialState: SimulationState = {
    simulatedScenarioIdx: 0,
    data: null
}

const LayoutReducer: Reducer<SimulationState, SimulationAction> = (state = initialState, action) => {
    switch(action.type) {
        case SimulationActionType.SIMULATE_SCENARIO:
            return {
                ...state,
            }
        case SimulationActionType.BAKE_SCENARIO:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default LayoutReducer;