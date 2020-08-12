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
    ABOUT_APP_MODAL                 = 1,
    ALERT_MODAL                     = 2,
    ADD_DEPARTURE_TO_ROUTE_MODAL    = 3,
    ADD_STATION_TO_ROUTE_MODAL      = 4,
    CONFIRM_MODAL                   = 5,
    DELETE_MODAL                    = 6,
    DIR_EDIT_MODAL                  = 7,
    EXPORT_PROJECT_MODAL            = 8,
    GRID_SIZE_MODAL                 = 9,
    KEYBOARD_SHORTCUTS_MODAL        = 10,
    CREATE_PROJECT_MODAL            = 11,
    OPEN_PROJECT_MODAL              = 12,
    PRESETS_MODAL                   = 13,
    RENAME_PROJECT_MODAL            = 14,
    SCENARIO_EDIT_MODAL             = 15,
    SCENARIO_RENAME_MODAL           = 16,
}
