import { Dispatch } from 'react';
import { DropdownMenuSection } from '../../../app/components/dropdownMenu/types';
import { showModal } from '../../../modalManager/actions';
import { ModalType } from '../../../modalManager/constants';
import { LayoutState } from '../../../app/store/layout/constants';
import { SetCanvasScale } from '../../../editor/components/workspace/components/pathfindingCanvas/actions';
import { 
    SetFileMenuValue, 
    SetExtrasMenuValue, 
    SetHelpMenuValue, 
    SetViewMenuValue, 
    SetEditMenuValue,
    SetSimulationPanelCollapse,
    SetComponentPanelCollapse
} from '../../../app/store/layout/actions';
import { CanvasState } from '../../../editor/components/workspace/components/pathfindingCanvas/constants';

type MenuSectionDefintions = {
    [key: string]: DropdownMenuSection[]
}

export const GetMenuSectionDefinitions = (dispatch: Dispatch<any>, canvasState: CanvasState, layoutState: LayoutState): MenuSectionDefintions => {
    const [scaleX, scaleY] = canvasState.scale;
    const { isComponentPanelCollapsed, isSimulationPanelCollapsed } = layoutState;
    
    return {
        "File":[
            {
                entries: [
                    { 
                        title: "Save", 
                        keyboardShortcut: "Ctrl + S", 
                        onClick: () => {
                            dispatch({type: '@project/SAVE_PROJECT'});
                            dispatch(SetFileMenuValue(false));
                        }
                    }
                ]
            },
            {
                entries: [
                    { 
                        title: "Open from local storage",
                        keyboardShortcut: "Ctrl + O", 
                        onClick: () => {
                            dispatch(showModal({
                                modalProps: {}, modalType: ModalType.OPEN_PROJECT_MODAL
                            }));
                            dispatch(SetFileMenuValue(false));
                        }
                    },
                    { 
                        title: "New Project", 
                        keyboardShortcut: "Ctrl + N", 
                        onClick: () => {
                            dispatch(showModal({
                                modalProps: {}, modalType: ModalType.CREATE_PROJECT_MODAL
                            }));
                            dispatch(SetFileMenuValue(false));
                        }
                    }
                ]
            },
            { entries: [{ 
                title: "Rename", 
                onClick: () => {
                    dispatch(showModal({
                        modalProps: {}, modalType: ModalType.RENAME_PROJECT_MODAL
                    }));
                    dispatch(SetFileMenuValue(false));
                }
            }] },
            { entries: [
                    // { title: "Import from...", onClick: () => {}},
                    { 
                        title: "Export as...", 
                        onClick: () => {
                            dispatch(showModal({
                                modalProps: {}, modalType: ModalType.EXPORT_PROJECT_MODAL
                            }));
                            dispatch(SetFileMenuValue(false));
                        }
                    }
                ]
            },
            // { entries: [{title: "Revision History", onClick: () => {}}] },
            { entries: [{title: "Close", onClick: () => window.close() }] },
        ],

        "Edit":[
            // {
            //     entries: [
            //         { title: "Undo", keyboardShortcut: "Ctrl + Z", onClick: () => {}},
            //         { title: "Redo", keyboardShortcut: "Ctrl + Y", onClick: () => {}}
            //     ]
            // },
            // {
            //     entries: [
            //         { title: "Cut",     keyboardShortcut: "Ctrl + X", onClick: () => {}},
            //         { title: "Copy",    keyboardShortcut: "Ctrl + C", onClick: () => {}},
            //         { title: "Paste",   keyboardShortcut: "Ctrl + V", onClick: () => {}}
            //     ]
            // },
            // { entries: [{ title: "Duplicate",   keyboardShortcut: "Ctrl + D", onClick: () => {}}] },
            // { entries: [{ title: "Lock/Unlock", onClick: () => {}}] },
            { entries: [{ 
                title: "Set Grid Size", 
                onClick: () => {
                    dispatch(showModal({
                        modalProps: {}, modalType: ModalType.GRID_SIZE_MODAL
                    }));
                    dispatch(SetEditMenuValue(false));
                }
            }]},
        ],

        "View":[
            { 
                entries: [
                    { 
                        title: "Component Panel",     
                        value: !isComponentPanelCollapsed, 
                        onClick: () => {
                            dispatch(SetComponentPanelCollapse(!isComponentPanelCollapsed));
                            dispatch(SetViewMenuValue(false));
                        }
                    },
                    { 
                        title: "Simulation Panel",    
                        value: !isSimulationPanelCollapsed, 
                        onClick: () => {
                            dispatch(SetSimulationPanelCollapse(!isSimulationPanelCollapsed));
                            dispatch(SetViewMenuValue(false));
                        }
                    }
                ]
            },
            // { 
            //     entries: [
            //         { title: "Tooltips",    value: true, onClick: () => {}},
            //         { title: "Ruler",       value: true, onClick: () => {}},
            //         { title: "Grid",        value: true, onClick: () => {}}
            //     ]
            // },
            // { 
            //     entries: [
            //         { 
            //             title: "Bus",     
            //             value: true, 
            //             onClick: () => {}
            //         },
            //         { 
            //             title: "Train",   
            //             value: true, 
            //             onClick: () => {}
            //         },
            //         { 
            //             title: "Tram",    
            //             value: true, 
            //             onClick: () => {}
            //         }
            //     ]
            // },
            { 
                entries: [
                    { 
                        title: "Reset View",  
                        keyboardShortcut: "Ctrl + R", 
                        onClick: () => {
                            dispatch(SetCanvasScale(1.05, 1.05));
                            dispatch(SetViewMenuValue(false));
                        }
                    },
                    { 
                        title: "Zoom In",     
                        keyboardShortcut: "Ctrl +", 
                        onClick: () => {
                            dispatch(SetCanvasScale(scaleX+0.1, scaleX+0.1));
                            dispatch(SetViewMenuValue(false));
                        }
                    },
                    { 
                        title: "Zoom Out",    
                        keyboardShortcut: "Ctrl -", 
                        onClick: () => {
                            dispatch(SetCanvasScale(scaleX-0.1, scaleX-0.1));
                            dispatch(SetViewMenuValue(false));
                        }
                    }
                ]
            },
        ],

        "Extras":[
            { entries: [{ 
                title: "Presets",
                onClick: () => {
                    dispatch(showModal({
                        modalProps: {}, modalType: ModalType.PRESETS_MODAL
                    }));
                    dispatch(SetExtrasMenuValue(false));
                }      
            }]},
            // { entries: [{ title: "Autosave",        onClick: () => {}}] },
            // { entries: [{ 
            //     title: "Edit Scenario",   
            //     onClick: () => {
            //         dispatch(showModal({
            //             modalProps: {}, modalType: ModalType.SCENARIO_EDIT_MODAL
            //         }));
            //         dispatch(SetExtrasMenuValue(false));
            //     }
            // }]},
            // { entries: [{ title: "Configuration",   onClick: () => {}}] },
        ],

        "Help":[
            { 
                entries: [{ 
                    title: "Keyboard Shortcuts",         
                    onClick: () => {
                        dispatch(showModal({
                            modalProps: {}, modalType: ModalType.KEYBOARD_SHORTCUTS_MODAL
                        }));
                        dispatch(SetHelpMenuValue(false));
                    }
                },
                    // { title: "Quick Start Video",         onClick: () => {}},
                ] 
            },
            { entries: [{ 
                title: "About Pathfinding.app",   
                onClick: () => {
                    dispatch(showModal({
                        modalProps: {}, modalType: ModalType.ABOUT_APP_MODAL
                    }));
                    dispatch(SetHelpMenuValue(false));
                }
            }] },
        ],
    }
}