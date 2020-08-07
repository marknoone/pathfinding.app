import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';

const GridSizeModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Edit Canvas Grid Size"
        primaryAction={{
            name: "Save",
            func: () => {}
        }}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>  
}
    
export default GridSizeModal;