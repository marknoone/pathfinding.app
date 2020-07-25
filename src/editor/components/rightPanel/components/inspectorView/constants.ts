import { ComponentTypes } from '../../../../constants';

export type InspectorState = {
    elementID: number
    componentType: string
}

export type InspectorAction = {
    type: string
    payload: { 
        elementID: number
        componentType: string
    }
}

export enum InspectorActionTypes {
    SET_INSPECTING_OBJECT = "@inspector/SET_INSPECTING_OBJECT"
}



