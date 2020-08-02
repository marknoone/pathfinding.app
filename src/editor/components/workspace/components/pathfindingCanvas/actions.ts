import { 
    CanvasActionTypes, 
    CanvasAction,
    CanvasState
} from './constants';

export const SetCanvasCoordinates = (x: number, y: number):CanvasAction => ({
    type: CanvasActionTypes.SET_COORDINATES,
    payload: {val: [[x, y]]}
})

export const SetCanvasSize = (w: number, h: number):CanvasAction => ({
    type: CanvasActionTypes.SET_CANVAS_SIZE,
    payload: {val: [[w, h]]}
})

export const SetCanvasBoxSize = (w: number, h: number):CanvasAction => ({
    type: CanvasActionTypes.SET_BOX_SIZE,
    payload: {val: [[w, h]]}
})

export const SetCanvasScale = (scaleX: number, scaleY: number):CanvasAction => ({
    type: CanvasActionTypes.SET_SCALE,
    payload: {val: [[scaleX, scaleY]]}
})

export const SetScaleAndCanvasScale = (
    x: number, y: number,
    scaleX: number, scaleY: number, 
):CanvasAction => ({
    type: CanvasActionTypes.SET_SCALE_AND_CANVAS,
    payload: { val: [[scaleX, scaleY], [x, y]] }
})