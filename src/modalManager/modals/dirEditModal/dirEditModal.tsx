import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const DirEditModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Edit Directory"
        primaryAction={{
            name: "Save",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default DirEditModal;