import CSS from 'csstype';
import Modal from '../modal';
import React, { useState } from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { SetProjectName } from '../../../app/store/project/actions';

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

const RenameProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const name = useSelector((s:AppState) => s.project.name);
    const [projectName, setProjectName] = useState<string>(name);

    return  <Modal title="Rename Project"
        size={{ w: '520px', h: '240px'}}
        primaryAction={{
            name: "Rename",
            func: () => dispatch(SetProjectName(projectName))
        }}
        render={() =>{
            return <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Enter a new name for the project.</p>
                <p style={Label}>Project Name:</p>
                <input style={Input} type="text" value={projectName} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} />
            </div>;
        }
    }/>  
}
    
export default RenameProjectModal;