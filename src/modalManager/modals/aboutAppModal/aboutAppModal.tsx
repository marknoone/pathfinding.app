import React from 'react';
import Modal from '../modal';

const AboutAppModal: React.FunctionComponent = (props) => 
    <Modal title={"About Our App"}
        render={() =>{
            return <p style={{}}>{"Testing"}</p>;
        }
    }/>
    
export default AboutAppModal;