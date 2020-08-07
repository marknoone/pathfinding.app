import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const OpenProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Open Project"
        primaryAction={{
            name: "Open",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default OpenProjectModal;