export type InspectorState = {
    active: boolean
    elementID: number
    componentType: number
}

export type InspectorAction = {
    type: string
    payload: { 
        elementID?: number
        isActive?: boolean
        componentType?: number
    } 
}

export enum InspectorActionTypes {
    SET_INSPECTOR_IS_ACTIVE = "@inspector/SET_INSPECTOR_IS_ACTIVE",
    SET_INSPECTING_OBJECT = "@inspector/SET_INSPECTING_OBJECT"
}



