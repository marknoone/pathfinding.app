import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

type CMProps = { title: string; confirmAction: () => void }
const ConfirmModal: React.FunctionComponent<CMProps> = ({ title, confirmAction }) => {
    const dispatch = useDispatch();
    return  <Modal title={title}
        primaryAction={{
            name: "Confirm",
            func: () => confirmAction()
        }}  
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default ConfirmModal;