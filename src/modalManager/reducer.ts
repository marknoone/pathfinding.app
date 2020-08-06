import { Reducer } from 'redux';
import { ModalActionTypes, ModalAction, ModalState } from './constants';

const initialState = {
    isModalOpen: false,
    modalType: -1,
    modalProps: {
        title: "Alert",
        message: "Hello world!"
    }
}
  
const ModalReducer: Reducer<ModalState, ModalAction> = (state = initialState, action) => {
    switch (action.type) {
      case ModalActionTypes.OPEN_MODAL:
        return {
            isModalOpen: true,
            modalProps: action.payload.props,
            modalType: action.payload.type,
        }
      case ModalActionTypes.CLOSE_MODAL:
        return initialState
      default:
        return state
    }
}

export default ModalReducer;