import { Reducer } from 'redux';
import { ToastState, ToastActionTypes, ToastAction, ToastType } from './constants';

const initialState: ToastState = {
    sortedQueue: [{
        type: ToastType.TOAST_WARN,
        msg: "This is a test notification",
    
        createdAt: Date.now()
    }]
}

const ToastReducer: Reducer<ToastState, ToastAction> = (state = initialState, action) => {
    switch(action.type) {
        case ToastActionTypes.ADD_TOAST_ERR:
            return {
                sortedQueue: [
                    ...state.sortedQueue.slice(0, state.sortedQueue.length),
                    {
                        type: ToastType.TOAST_ERR,
                        msg: action.payload.val,
                        createdAt: Date.now(),
                    },
                ]
            }
        case ToastActionTypes.ADD_TOAST_INFO:
            return {
                sortedQueue: [
                    ...state.sortedQueue.slice(0, state.sortedQueue.length),
                    {
                        type: ToastType.TOAST_INFO,
                        msg: action.payload.val,
                        createdAt: Date.now(),
                    },
                ]
            }
        case ToastActionTypes.ADD_TOAST_SUCCESS:
            return {
                sortedQueue: [
                    ...state.sortedQueue.slice(0, state.sortedQueue.length),
                    {
                        type: ToastType.TOAST_SUCCESS,
                        msg: action.payload.val,
                        createdAt: Date.now(),
                    },
                ]
            }
        case ToastActionTypes.ADD_TOAST_WARN:
            return {
                sortedQueue: [
                    ...state.sortedQueue.slice(0, state.sortedQueue.length),
                    {
                        type: ToastType.TOAST_WARN,
                        msg: action.payload.val,
                        createdAt: Date.now(),
                    },
                ]
            }
        case ToastActionTypes.DELETE_TOAST_NOTIFICATION:
            const idx = parseInt(action.payload.val, 10)
            return !isNaN(idx)? {
                sortedQueue: [
                    ...state.sortedQueue.slice(0, idx), 
                    ...state.sortedQueue.slice(idx + 1)
                ]
            }: state;
        default:
            return state;
    }
}

export default ToastReducer;