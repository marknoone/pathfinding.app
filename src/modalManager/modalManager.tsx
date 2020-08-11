import React from 'react';
import ReactModal from 'react-modal';
import { AppState } from '../store';
import { closeModal } from './actions';
import { ModalType } from './constants';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { AboutAppModal, AlertModal, ConfirmModal, DeleteModal, DirEditModal, 
    ExportProjectModal, GridSizeModal, KeyboardShortcutsModal,
    OpenProjectModal, PresetsModal, RenameProjectModal, ScenarioRenameModal, 
    ScenarioEditModal, CreateProjectModal
} from './modals';

type ModalMap = { [key:number]: React.FunctionComponent<any>};
const MODALS:ModalMap  = {
    [ModalType.ABOUT_APP_MODAL]:          AboutAppModal,
    [ModalType.ALERT_MODAL]:              AlertModal,
    [ModalType.CONFIRM_MODAL]:            ConfirmModal,
    [ModalType.DELETE_MODAL]:             DeleteModal,
    [ModalType.DIR_EDIT_MODAL]:           DirEditModal,
    [ModalType.EXPORT_PROJECT_MODAL]:     ExportProjectModal,
    [ModalType.GRID_SIZE_MODAL]:          GridSizeModal,
    [ModalType.KEYBOARD_SHORTCUTS_MODAL]: KeyboardShortcutsModal,
    [ModalType.CREATE_PROJECT_MODAL]:     CreateProjectModal,
    [ModalType.OPEN_PROJECT_MODAL]:       OpenProjectModal,
    [ModalType.PRESETS_MODAL]:            PresetsModal,
    [ModalType.RENAME_PROJECT_MODAL]:     RenameProjectModal,
    [ModalType.SCENARIO_EDIT_MODAL]:      ScenarioEditModal,
    [ModalType.SCENARIO_RENAME_MODAL]:    ScenarioRenameModal
};

ReactModal.setAppElement("#root");

const ModalManager: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const modalType = useSelector((s:AppState) => s.modals.modalType);
    const isModalOpen = useSelector((s: AppState) => s.modals.isModalOpen);
    const modalProps = useSelector((s:AppState) => s.modals.modalProps, shallowEqual);
    
    if (!Object.keys(MODALS).includes(modalType.toString())) {
        return null
    }

    const SpecifiedModal = MODALS[modalType]
    return <ReactModal
        style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 120 },
            content: { 
                position: 'relative', 
                top: 0, left: 0,
                right: 0, bottom: 0,
                border: 'none',
                background: 'none', 
                margin: 'auto', 
                verticalAlign: 'center',
                width: `100%`, 
                height: `100%`,
                overflow: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }}
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => dispatch(closeModal())}
        ariaHideApp={false}
    >
        <SpecifiedModal
        closeModal={() => dispatch(closeModal())}
        {...modalProps}
        />
    </ReactModal>;
}

export default ModalManager;