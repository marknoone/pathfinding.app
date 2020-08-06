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
    ALERT_MODAL     = 0,
    CONFIRM_MODAL   = 1,
    DELETE_MODAL    = 2,
    DIR_EDIT_MODAL  = 3,
    PROMPT_MODAL    = 4,
    SCENARIO_MODAL  = 5
}

export type ModalSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ModalSizeObj = {
    width: number,
    height: number
}

