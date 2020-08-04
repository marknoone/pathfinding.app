export type LayoutState = {
    isTopbarCollapsed: boolean
    isInspectorPanelCollapsed: boolean
    isSimulationPanelCollapsed: boolean
    actionMenus: {
        isFileShowing: boolean,
        isEditShowing: boolean,
        isViewShowing: boolean,
        isExtraShowing: boolean,
        isHelpShowing: boolean,
    }
    toolbar: {
        isLayoutSelectShowing: boolean
        isZoomLevelShowing: boolean
    }
} 

export type LayoutAction = {
    type: string,
    payload: {val: boolean}
}

export enum LayoutActionTypes {
    SET_INSPECTOR_COLLAPSE_VALUE = "@layout/SET_INSPECTOR_COLLAPSE_VALUE",
    SET_SIMULATION_COLLAPSE_VALUE = "@layout/SET_SIMULATION_COLLAPSE_VALUE",
    SET_TOPBAR_COLLAPSE_VALUE = "@layout/SET_TOPBAR_COLLAPSE_VALUE",

    SET_MENU_FILE_VALUE = "@layout/SET_MENU_FILE_VALUE",
    SET_MENU_EDIT_VALUE = "@layout/SET_MENU_EDIT_VALUE",
    SET_MENU_VIEW_VALUE = "@layout/SET_MENU_VIEW_VALUE",
    SET_MENU_EXTRAS_VALUE = "@layout/SET_MENU_EXTRAS_VALUE",
    SET_MENU_HELP_VALUE = "@layout/SET_MENU_HELP_VALUE",
    
    SET_TOOLBAR_LAYOUT_SELECT_VALUE = "@layout/SET_TOOLBAR_LAYOUT_SELECT_VALUE",
    SET_TOOLBAR_ZOOM_LEVEL_VALUE = "@layout/SET_TOOLBAR_ZOOM_LEVEL_VALUE"
}