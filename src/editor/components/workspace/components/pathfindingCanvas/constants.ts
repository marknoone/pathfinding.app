export type CanvasAction = { 
    type: string; 
    payload: { 
        val: number[][]
    } 
}

export enum CanvasActionTypes {  
    SET_SCALE = "@@canvas/SET_SCALE",
    SET_BOX_SIZE = "@@canvas/SET_BOX_SIZE",
    SET_COORDINATES = "@@canvas/SET_COORDINATES",
    SET_CANVAS_SIZE = "@@canvas/SET_CANVAS_SIZE",
    SET_SCALE_AND_CANVAS = "@@canvas/SET_SCALE_AND_CANVAS",
}

export type CanvasState = {
    boxSize: number,
    scale: number[],
    canvasSize: number[],
    coords: number[],
}


