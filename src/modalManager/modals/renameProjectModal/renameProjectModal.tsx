import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const RenameProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Select A Preset"
        primaryAction={{
            name: "Save",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default RenameProjectModal;