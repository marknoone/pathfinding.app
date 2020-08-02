import { LayoutActionTypes, LayoutAction } from './constants';

export const SetInspectorPanelCollapse = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_INSPECTOR_COLLAPSE_VALUE,
    payload: {val: val}
})

export const SetSimulationPanelCollapse = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_SIMULATION_COLLAPSE_VALUE,
    payload: {val: val}
})

export const SetToolbarCollapse = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_TOPBAR_COLLAPSE_VALUE,
    payload: {val: val}
})