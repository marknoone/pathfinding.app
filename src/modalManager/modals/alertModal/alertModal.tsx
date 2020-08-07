import React from 'react';
import Modal from '../modal';

type AMProps = { title: string; message: string; onSuccess: () => void }
const AlertModal: React.FunctionComponent<AMProps> = ({ title, message, onSuccess }) =>
    <Modal title={title}
        primaryAction={{
            name: "Ok",
            func: () => onSuccess()
        }}  
        render={() =>{
            return <p style={{}}>{message}</p>;
        }
    }/>  
    
export default AlertModal;