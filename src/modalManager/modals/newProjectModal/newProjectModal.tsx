import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const NewProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="New Project"
        primaryAction={{
            name: "Create",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default NewProjectModal;