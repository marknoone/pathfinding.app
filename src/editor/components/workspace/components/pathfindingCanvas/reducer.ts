import { Reducer } from 'redux';
import { CanvasState, CanvasAction, CanvasActionTypes } from './constants'

export const initialState: CanvasState = {
    boxSize: 30,
    scale: [1.0, 1.0],
    coords: [250, 250],
    canvasSize: [800, 800],
}

const CanvasReducer: Reducer<CanvasState, CanvasAction> = (state = initialState, action) => {
    switch(action.type) {
        case CanvasActionTypes.SET_BOX_SIZE:
            return {
                ...state,
                boxSize: action.payload.val[0][0]
            }
        case CanvasActionTypes.SET_CANVAS_SIZE:
            return {
                ...state,
                canvasSize: action.payload.val[0]
            }
        case CanvasActionTypes.SET_SCALE:
            return {
                ...state,
                scale: action.payload.val[0]
            }
        case CanvasActionTypes.SET_COORDINATES:
            return {
                ...state,
                coords: action.payload.val[0]
            }
        case CanvasActionTypes.SET_SCALE_AND_CANVAS:
            return {
                ...state,
                scale: action.payload.val[0],
                coords: action.payload.val[1]
            }
        default:
            return state;
    }
}

export default CanvasReducer;