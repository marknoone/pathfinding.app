import { LayoutState } from "../../store/layout/constants";
import { ScenarioState } from "../../../editor/constants";
import { CanvasState } 
    from "../../../editor/components/workspace/components/pathfindingCanvas/constants";
import { InspectorState } 
    from "../../../editor/components/rightPanel/components/inspectorView/constants";

export type ProjectState = ProjectSummary
export type ProjectSummary = {
    id: number,
    name: string,
    lastEdited: number
}

export type ProjectData = {
    layout: LayoutState,
    scenario: ScenarioState,
    inspector: InspectorState,
    canvas: CanvasState,
}


export type ProjectAction = {
    type: string,
    payload: {
        id?: number
        name?: string
        lastEdited?: number
    }
}

export enum ProjectActionTypes {
    SAVE_PROJECT = '@project/SAVE_PROJECT', // Trigger redux saga side effect
    LOAD_PROJECT = '@project/LOAD_PROJECT', // Trigger redux saga side effect
    SET_PROJECT_ID = "@project/SET_PROJECT_ID",
    SET_PROJECT_NAME = "@project/SET_PROJECT_NAME",
    CREATE_NEW_PROJECT = "@project/CREATE_NEW_PROJECT",
    SET_PROJECT_LAST_EDIT = "@project/SET_PROJECT_LAST_EDIT",
}