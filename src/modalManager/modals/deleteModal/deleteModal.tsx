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

type DMProps = { title?: string; deleteAction: () => void }
const DeleteModal: React.FunctionComponent<DMProps> = ({ title, deleteAction }) =>
    <Modal title={title? title:"Delete Confirmation"}
        size={{w: '480px', h: '220px'}}
        primaryAction={{
            name: "Delete",
            func: () => deleteAction()
        }}
        render={() =>{
            return <p style={MsgStyle}>
                Are you sure you want delete this object? 
            </p>;
        }
    }/>;
    
export default DeleteModal;