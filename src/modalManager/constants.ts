export type ModalState = {
    isModalOpen: boolean

    modalType: number
    modalProps: any
}

export type ModalAction = {
    type: string
    payload:  { 
        type:  number
        props: any 
    }
}

export enum ModalActionTypes {
    OPEN_MODAL = "@modal/OPEN_MODAL",
    CLOSE_MODAL = "@modal/CLOSE_MODAL",
}

export enum ModalType {
    ABOUT_APP_MODAL           = 1,
    ALERT_MODAL               = 2,
    CONFIRM_MODAL             = 3,
    DELETE_MODAL              = 4,
    DIR_EDIT_MODAL            = 5,
    EXPORT_PROJECT_MODAL      = 6,
    GRID_SIZE_MODAL           = 7,
    KEYBOARD_SHORTCUTS_MODAL  = 8,
    NEW_PROJECT_MODAL         = 9,
    OPEN_PROJECT_MODAL        = 10,
    PRESETS_MODAL             = 11,
    RENAME_PROJECT_MODAL      = 12,
    SCENARIO_EDIT_MODAL       = 13,
    SCENARIO_RENAME_MODAL     = 14,
}
