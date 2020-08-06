import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { AddSuccessToastNotification } from '../../../toastManager/actions';

type AMProps = {
    title: string
    message: string

    closeModal: () => void
}

const AlertModal: React.FunctionComponent<AMProps> = ({ closeModal, title, message }) => {
    const dispatch = useDispatch();
    return  <Modal title={title} closeAction={() => closeModal()}
        saveAction={() => dispatch(AddSuccessToastNotification("Testing alerts!!"))}  
        render={() =>{
            return <p style={{}}>{message}</p>;
        }
    }/>  
}
    
export default AlertModal;