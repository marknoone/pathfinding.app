export type ToastState = {
    sortedQueue: ToastNotification[]
}

export type ToastAction = {
    type: string
    payload:  { val: string }
}

export enum ToastActionTypes {
    ADD_TOAST_ERR = "@toast/POST_TOAST_ERR",
    ADD_TOAST_WARN = "@toast/POST_TOAST_WARN",
    ADD_TOAST_INFO = "@toast/POST_TOAST_INFO",
    ADD_TOAST_SUCCESS = "@toast/POST_TOAST_SUCCESS",
    DELETE_TOAST_NOTIFICATION = "@toast/DELETE_TOAST_NOTIFICATION",
}

export enum ToastType {
    TOAST_ERR     = 0,
    TOAST_WARN    = 1,
    TOAST_SUCCESS = 2,
    TOAST_INFO    = 3
}

export type ToastNotification = {
    type: ToastType,
    msg: string,

    createdAt: number
}

