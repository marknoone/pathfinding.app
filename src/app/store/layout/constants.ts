export type LayoutState = {
    isTopbarCollapsed: boolean
    isInspectorPanelCollapsed: boolean
    isSimulationPanelCollapsed: boolean
} 

export type LayoutAction = {
    type: string,
    payload: {val: boolean}
}

export enum LayoutActionTypes {
    SET_INSPECTOR_COLLAPSE_VALUE = "@layout/SET_INSPECTOR_COLLAPSE_VALUE",
    SET_SIMULATION_COLLAPSE_VALUE = "@layout/SET_SIMULATION_COLLAPSE_VALUE",
    SET_TOPBAR_COLLAPSE_VALUE = "@layout/SET_TOPBAR_COLLAPSE_VALUE"
}