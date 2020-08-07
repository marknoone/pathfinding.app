export type ProjectState = {
    name: string
    lastEdited: number
} 

export type ProjectAction = {
    type: string,
    payload: {
        name?: string
        lastEdited?: number
    }
}

export enum ProjectActionTypes {
    SET_PROJECT_NAME = "@project/SET_PROJECT_NAME",
    SET_PROJECT_LAST_EDIT = "@project/SET_PROJECT_LAST_EDIT",
}