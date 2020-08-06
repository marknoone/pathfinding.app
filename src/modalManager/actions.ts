import { ModalActionTypes, ModalType } from './constants';

export const showModal = ({modalProps, modalType}: {modalProps:any, modalType:ModalType}) => ({
    type: ModalActionTypes.OPEN_MODAL,
    modalProps,
    modalType
});

export const closeModal = () => ({
    type: ModalActionTypes.CLOSE_MODAL,
});