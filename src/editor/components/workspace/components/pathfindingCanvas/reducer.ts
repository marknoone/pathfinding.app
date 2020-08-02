import { Reducer } from 'redux';
import { CanvasState, CanvasAction, CanvasActionTypes } from './constants'

const initialState: CanvasState = {
    scale: 1.0,
    boxSize: 30,
    canvasSize: [800, 800],
    coords: [250, 250],
}

const CanvasReducer: Reducer<CanvasState, CanvasAction> = (state = initialState, action) => {
    switch(action.type) {
        case CanvasActionTypes.SET_BOX_SIZE:
            return {
                ...state,
                boxSize: action.payload.val[0]
            }
        case CanvasActionTypes.SET_CANVAS_SIZE:
            return {
                ...state,
                canvasSize: action.payload.val
            }
        case CanvasActionTypes.SET_SCALE:
            return {
                ...state,
                scale: action.payload.val[0]
            }
        case CanvasActionTypes.SET_COORDINATES:
            return {
                ...state,
                coords: action.payload.val
            }
        default:
            return state;
    }
}

export default CanvasReducer;