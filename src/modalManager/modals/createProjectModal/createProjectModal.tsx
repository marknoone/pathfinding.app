import CSS from 'csstype';
import Modal from '../modal';
import React, { useState } from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewProject } from '../../../app/store/project/actions';

const Label: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px',
    display: 'inline-block'
}

const MsgStyle: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    color: '#464646',
};

const Input: CSS.Properties = {
    borderRadius: '6px',
    border: '1px solid #ddd',
    padding: '5px 5px',
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    width: '325px',
    marginLeft: '24px'
}

const CreateProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState<string>("");

    return  <Modal title="Create a new project"
        size={{ w: '520px', h: '240px'}}
        primaryAction={{
            name: "Create",
            func: () => dispatch(CreateNewProject(projectName))
        }}
        render={() =>{
            return <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Enter a name for the new project.</p>
                <p style={Label}>Project Name:</p>
                <input style={Input} type="text" value={projectName} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} />
            </div>;
        }
    }/>  
}
    
export default CreateProjectModal;