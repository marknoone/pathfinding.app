import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

type DMProps = {
    title: string

    deleteAction: () => void
}

const DeleteModal: React.FunctionComponent<DMProps> = ({ title, deleteAction }) => {
    const dispatch = useDispatch();
    return  <Modal title={title}
        primaryAction={{
            name: "Delete",
            func: () => deleteAction()
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default DeleteModal;