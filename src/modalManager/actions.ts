import { ModalActionTypes } from './constants';

export const showModal = ({modalProps, modalType}: {modalProps:any, modalType:number}) => ({
    type: ModalActionTypes.OPEN_MODAL,
    payload: {
        type: modalType,
        props: modalProps,
    }
});

export const closeModal = () => ({
    type: ModalActionTypes.CLOSE_MODAL,
});