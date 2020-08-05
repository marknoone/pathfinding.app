import { ToastActionTypes, ToastAction } from './constants';

export const AddErrorToastNotification = (msg: string):ToastAction => ({
    type: ToastActionTypes.ADD_TOAST_ERR,
    payload: {val: msg}
})

export const AddInfoToastNotification = (msg: string):ToastAction => ({
    type: ToastActionTypes.ADD_TOAST_INFO,
    payload: {val: msg}
})

export const AddWarningToastNotification = (msg: string):ToastAction => ({
    type: ToastActionTypes.ADD_TOAST_WARN,
    payload: {val: msg}
})

export const AddSuccessToastNotification = (msg: string):ToastAction => ({
    type: ToastActionTypes.ADD_TOAST_SUCCESS,
    payload: {val: msg}
})

export const DeleteToastNotification = (id: number):ToastAction => ({
    type: ToastActionTypes.DELETE_TOAST_NOTIFICATION,
    payload: {val: id+""}
})