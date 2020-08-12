import { Reducer } from 'redux';
import { ProjectState, ProjectAction, ProjectActionTypes } from './constants'

export const initialState: ProjectState = {
    id: 0,
    name: "Untitled Project",
    lastEdited: Date.now()
}

const ProjectReducer: Reducer<ProjectState, ProjectAction> = (state = initialState, action) => {
    switch(action.type) {
        case ProjectActionTypes.SET_PROJECT_ID:
            return action.payload.id?{
                ...state,
                id: action.payload.id
            }: state;
        case ProjectActionTypes.SET_PROJECT_NAME:
            return action.payload.name?{
                ...state,
                name: action.payload.name
            }: state;
        case ProjectActionTypes.CREATE_NEW_PROJECT:
            return action.payload.name?{
                ...initialState,
                name: action.payload.name
            }: initialState // SAGA will update ID
        case ProjectActionTypes.SET_PROJECT_LAST_EDIT:
            return action.payload.lastEdited?{
                ...state,
                lastEdited: action.payload.lastEdited
            }: state;
        default:
            return state;
    }
}

export default ProjectReducer;