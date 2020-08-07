import CSS from 'csstype';
import Modal from '../modal';
import React, { useState } from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateDirectoryWithID } 
    from '../../../editor/components/leftPanel/components/passengerView/actions';
import { isPassengerDirectory } 
    from '../../../editor/components/leftPanel/components/passengerView/constants';

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

type DEMProps = { dirID: number }
const DirEditModal: React.FunctionComponent<DEMProps> = ({ dirID }) => {
    const dispatch = useDispatch();
    const dir = useSelector((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx].passengers.tree[dirID]);
    const [dirName, setDirName] = useState<string>(dir.name);

    if(!isPassengerDirectory(dir))
        return null

    return  <Modal title="Edit Directory"
        size={{ w: '520px', h: '240px'}}
        primaryAction={{
            name: "Save",
            func: () => dispatch(UpdateDirectoryWithID({...dir, name: dirName}))
        }}
        render={() =>{
            return <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Enter a new name for the selected directory.</p>
                <p style={Label}>Directory Name:</p>
                <input style={Input} type="text" value={dirName} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)} />
            </div>;
        }
    }/>  
}
    
export default DirEditModal;