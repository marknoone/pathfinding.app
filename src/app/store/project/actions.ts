import { ProjectActionTypes, ProjectAction } from './constants';

export const SetProjectName = (val: string):ProjectAction => ({
    type: ProjectActionTypes.SET_PROJECT_NAME,
    payload: {name: val}
})

export const SaveProject = ():ProjectAction => ({
    type: ProjectActionTypes.SAVE_PROJECT,
    payload: {}
})

export const LoadProject = (id: number):ProjectAction => ({
    type: ProjectActionTypes.LOAD_PROJECT,
    payload: {id: id}
})

export const CreateNewProject = (name: string):ProjectAction => ({
    type: ProjectActionTypes.CREATE_NEW_PROJECT,
    payload: {name: name}
})

export const SetProjectLastEdit = (val: number):ProjectAction => ({
    type: ProjectActionTypes.SET_PROJECT_LAST_EDIT,
    payload: {lastEdited: val}
})