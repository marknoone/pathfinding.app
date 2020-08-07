import { ProjectActionTypes, ProjectAction } from './constants';

export const SetProjectName = (val: string):ProjectAction => ({
    type: ProjectActionTypes.SET_PROJECT_NAME,
    payload: {name: val}
})

export const SetProjectLastEdit = (val: number):ProjectAction => ({
    type: ProjectActionTypes.SET_PROJECT_LAST_EDIT,
    payload: {lastEdited: val}
})