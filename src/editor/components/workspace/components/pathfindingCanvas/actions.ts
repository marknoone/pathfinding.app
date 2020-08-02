import { 
    CanvasActionTypes, 
    CanvasAction,
    CanvasState
} from './constants';

export const SetCoordinates = (x, y: number):CanvasAction => ({
    type: CanvasActionTypes.SET_COORDINATES,
    payload: {val: [x, y]}
})

export const SetCanvasSize = (w, h: number):CanvasAction => ({
    type: CanvasActionTypes.SET_CANVAS_SIZE,
    payload: {val: [w, h]}
})

export const SetBoxSize = (w, h: number):CanvasAction => ({
    type: CanvasActionTypes.SET_BOX_SIZE,
    payload: {val: [w, h]}
})

export const SetCanvasScale = (scale: number):CanvasAction => ({
    type: CanvasActionTypes.SET_SCALE,
    payload: {val: [scale]}
})