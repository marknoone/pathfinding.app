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

// Action Menus
export const SetFileMenuValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_MENU_FILE_VALUE,
    payload: {val: val}
})

export const SetEditMenuValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_MENU_EDIT_VALUE,
    payload: {val: val}
})

export const SetViewMenuValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_MENU_VIEW_VALUE,
    payload: {val: val}
})

export const SetExtrasMenuValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_MENU_EXTRAS_VALUE,
    payload: {val: val}
})

export const SetHelpMenuValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_MENU_HELP_VALUE,
    payload: {val: val}
})

// Toolbar dropdowns
export const SetToolbarLayoutSelectValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_TOOLBAR_LAYOUT_SELECT_VALUE,
    payload: {val: val}
})

export const SetToolbarZoomLevelValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_TOOLBAR_ZOOM_LEVEL_VALUE,
    payload: {val: val}
})

export const SetToolbarAddComponentValue = (val: boolean):LayoutAction => ({
    type: LayoutActionTypes.SET_TOOLBAR_ADD_COMPONENT_VALUE,
    payload: {val: val}
})