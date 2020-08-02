export type InspectorState = {
    elementID: number
    componentType: number
}

export type InspectorAction = {
    type: string
    payload: { 
        elementID: number
        componentType: number
    }
}

export enum InspectorActionTypes {
    SET_INSPECTING_OBJECT = "@inspector/SET_INSPECTING_OBJECT"
}



