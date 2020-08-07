import { Reducer } from 'redux';
import { ProjectState, ProjectAction, ProjectActionTypes } from './constants'

const initialState: ProjectState = {
    name: "Untitled Project",
    lastEdited: 1594985729285
}

const ProjectReducer: Reducer<ProjectState, ProjectAction> = (state = initialState, action) => {
    switch(action.type) {
        case ProjectActionTypes.SET_PROJECT_NAME:
            return action.payload.name?{
                ...state,
                name: action.payload.name
            }: state;
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