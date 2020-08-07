import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const ExportProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Export Project"
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default ExportProjectModal;