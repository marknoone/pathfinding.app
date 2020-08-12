import { Dispatch } from "react";
import { SaveProject } from '../../store/project/actions';
import { showModal } from '../../../modalManager/actions';
import { ModalType } from "../../../modalManager/constants";

const handlerMap = (dispatch: Dispatch<any>) => ({
    NUDGE_LEFT: () => console.log("Nudging"),
    HEAVY_NUDGE_LEFT: () => console.log("Heavy Nudging"),

    NEW_PROJECT: (e: any) => {
        e.preventDefault();
        dispatch(showModal({modalType: ModalType.CREATE_PROJECT_MODAL, modalProps: {}}));
    },
    
    OPEN_PROJECT: (e: any) => {
        e.preventDefault();
        dispatch(showModal({modalType: ModalType.OPEN_PROJECT_MODAL, modalProps: {}}));
    },
    
    SAVE_PROJECT: (e: any) => {
        e.preventDefault();
        dispatch(SaveProject());
    },

})

export default handlerMap;