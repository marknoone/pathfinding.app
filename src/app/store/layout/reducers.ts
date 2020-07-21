import { Reducer } from 'redux';
import { LayoutState, LayoutAction, LayoutActionTypes } from './constants'

const initialState: LayoutState = {
    isTopbarCollapsed: false,
    isInspectorPanelCollapsed: false,
    isSimulationPanelCollapsed: false,
}

const LayoutReducer: Reducer<LayoutState, LayoutAction> = (state = initialState, action) => {
    switch(action.type) {
        case LayoutActionTypes.SET_INSPECTOR_COLLAPSE_VALUE:
            return {
                ...state,
                isInspectorPanelCollapsed: action.payload.val
            }
        case LayoutActionTypes.SET_SIMULATION_COLLAPSE_VALUE:
            return {
                ...state,
                isSimulationPanelCollapsed: action.payload.val
            }
        case LayoutActionTypes.SET_TOPBAR_COLLAPSE_VALUE:
            return {
                ...state,
                isTopbarCollapsed: action.payload.val
            }
        default:
            return state;
    }
}

export default LayoutReducer;