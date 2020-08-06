import React from 'react';
import ReactModal from 'react-modal';
import { AppState } from '../store';
import { closeModal } from './actions';
import { ModalType } from './constants';
import { BaseStyle } from './modalManager.css';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { AlertModal, ConfirmModal, DeleteModal, DirEditModal, 
    PromptModal, ScenarioEditModal } from './modals';

type ModalMap = { [key:number]: React.FunctionComponent<any>};
const MODALS:ModalMap  = {
    [ModalType.ALERT_MODAL]:    AlertModal,
    [ModalType.CONFIRM_MODAL]:  ConfirmModal,
    [ModalType.DELETE_MODAL]:   DeleteModal,
    [ModalType.DIR_EDIT_MODAL]: DirEditModal,
    [ModalType.PROMPT_MODAL]:   PromptModal,
    [ModalType.SCENARIO_MODAL]: ScenarioEditModal,
};

ReactModal.setAppElement("#root");

const ModalManager: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((s: AppState) => s.modals.isModalOpen);
    const modalType = useSelector((s:AppState) => s.modals.modalType);
    const modalProps = useSelector((s:AppState) => s.modals.modalProps, shallowEqual);
    
    if (!Object.keys(MODALS).includes(modalType.toString())) {
        return null
    }

    const SpecifiedModal = MODALS[modalType]
    return <ReactModal
        style={{
            overlay: { zIndex: 120 }
        }}
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => dispatch(closeModal())}
        contentLabel="Example Modal"
        ariaHideApp={false}
        bodyOpenClassName="modal-open"
    >
        <p>Modal!</p>
        <SpecifiedModal
        closeModal={() => dispatch(closeModal())}
        {...modalProps}
        />
    </ReactModal>;
}

export default ModalManager;