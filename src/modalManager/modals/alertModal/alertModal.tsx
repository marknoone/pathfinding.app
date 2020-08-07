import React from 'react';
import Modal from '../modal';
import CSS from 'csstype';

const MsgStyle: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    color: '#464646',
    padding: '8px 16px'
};

type AMProps = { title?: string; message: string; onSuccess: () => void }
const AlertModal: React.FunctionComponent<AMProps> = ({ title, message, onSuccess }) =>
    <Modal title={title?title:"Alert"} size={{w: '460px', h: '260px'}}
        primaryAction={{
            name: "Ok",
            func: () => onSuccess()
        }}  
        render={() =>{
            return <p style={MsgStyle}>{message}</p>;
        }
    }/>  
    
export default AlertModal;