import React from 'react';
import Modal from '../modal';

type AMProps = {
    title: string
    message: string

    closeModal: () => void
}

const AlertModal: React.FunctionComponent<AMProps> = ({ closeModal, title, message }) => 
    <Modal title={title} saveAction={() => {}} closeAction={() => closeModal()} render={() =>{

        return <p style={{}}>{message}</p>;
    }}/>;


export default AlertModal;