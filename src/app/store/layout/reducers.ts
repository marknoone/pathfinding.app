import { Reducer } from 'redux';
import { LayoutState, LayoutAction, LayoutActionTypes } from './constants'

const initialState: LayoutState = {
    isTopbarCollapsed: false,
    isInspectorPanelCollapsed: false,
    isSimulationPanelCollapsed: false,
    actionMenus: {
        isFileShowing: false,
        isEditShowing: false,
        isViewShowing: false,
        isExtraShowing: false,
        isHelpShowing: false,
    },
    toolbar: {
        isLayoutSelectShowing: false,
        isZoomLevelShowing: false,
        isAddComponentShowing: false,
    }
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
        case LayoutActionTypes.SET_MENU_FILE_VALUE:
            return {
                ...state,
                actionMenus: {
                    isFileShowing: action.payload.val,
                    isEditShowing: false,
                    isViewShowing: false,
                    isExtraShowing: false,
                    isHelpShowing: false,
                }
            }
        case LayoutActionTypes.SET_MENU_EDIT_VALUE:
            return {
                ...state,
                actionMenus: {
                    isFileShowing: false,
                    isEditShowing: action.payload.val,
                    isViewShowing: false,
                    isExtraShowing: false,
                    isHelpShowing: false,
                }
            }
        case LayoutActionTypes.SET_MENU_VIEW_VALUE:
            return {
                ...state,
                actionMenus: {
                    isFileShowing: false,
                    isEditShowing: false,
                    isViewShowing: action.payload.val,
                    isExtraShowing: false,
                    isHelpShowing: false,
                }
            }
        case LayoutActionTypes.SET_MENU_EXTRAS_VALUE:
            return {
                ...state,
                actionMenus: {
                    isFileShowing: false,
                    isEditShowing: false,
                    isViewShowing: false,
                    isExtraShowing: action.payload.val,
                    isHelpShowing: false,
                }
            }
        case LayoutActionTypes.SET_MENU_HELP_VALUE:
            return {
                ...state,
                actionMenus: {
                    isFileShowing: false,
                    isEditShowing: false,
                    isViewShowing: false,
                    isExtraShowing: false,
                    isHelpShowing: action.payload.val,
                }
            }
        case LayoutActionTypes.SET_TOOLBAR_LAYOUT_SELECT_VALUE:
            return {
                ...state,
                toolbar: {
                    isLayoutSelectShowing: action.payload.val,
                    isZoomLevelShowing: false,
                    isAddComponentShowing: false
                }
            }
        case LayoutActionTypes.SET_TOOLBAR_ZOOM_LEVEL_VALUE:
            return {
                ...state,
                toolbar: {
                    isLayoutSelectShowing: false,
                    isZoomLevelShowing: action.payload.val,
                    isAddComponentShowing: false
                }
            }
        case LayoutActionTypes.SET_TOOLBAR_ADD_COMPONENT_VALUE:
            return {
                ...state,
                toolbar: {
                    isLayoutSelectShowing: false,
                    isZoomLevelShowing: false,
                    isAddComponentShowing: action.payload.val
                }
            }
        default:
            return state;
    }
}

export default LayoutReducer;