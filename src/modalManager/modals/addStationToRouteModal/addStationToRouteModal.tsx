import React from 'react';
import Modal from '../modal';
import CSS from 'csstype';

type ASTRMProps = { routeID: number; }
const AddStationToRouteModal: React.FunctionComponent<ASTRMProps> = ({ routeID }) =>
    <Modal title={"Add Station To Route"} size={{w: '460px', h: '260px'}}
        primaryAction={{
            name: "Add",
            func: () => {}
        }}  
        render={() =>{
            return <p style={{}}>Hello! {routeID} </p>;
        }
    }/>  
    
export default AddStationToRouteModal;