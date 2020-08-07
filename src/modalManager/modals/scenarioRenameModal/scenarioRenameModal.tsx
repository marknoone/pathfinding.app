import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const ScenarioRenameModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Rename Scenario"
        primaryAction={{
            name: "Save",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default ScenarioRenameModal;