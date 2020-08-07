import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const PresetSelectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Select A Preset"
        primaryAction={{
            name: "Select",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default PresetSelectModal;