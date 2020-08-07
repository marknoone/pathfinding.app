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

type CMProps = { title?: string; msg?: string, onSuccess: () => void }
const ConfirmModal: React.FunctionComponent<CMProps> = ({ title, msg, onSuccess }) => 
    <Modal title={title?title:"Confirm action"}
        size={{w: '480px', h: '220px'}}
        primaryAction={{
            name: "Confirm",
            func: () => onSuccess()
        }}  
        render={() =>{
            return <p style={MsgStyle}>{
                msg?
                msg:
                "Are you sure you want to proceed?"
            }</p>;
        }
    }/>  
    
export default ConfirmModal;