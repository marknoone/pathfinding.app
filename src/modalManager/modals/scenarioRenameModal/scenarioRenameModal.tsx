import CSS from 'csstype';
import Modal from '../modal';
import React, { useState } from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { SetScenarioNameByIdx } from '../../../editor/actions';

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

type SRMProps = { scenarioID: number }
const ScenarioRenameModal: React.FunctionComponent<SRMProps> = ({ scenarioID }) => {
    const dispatch = useDispatch();
    const activeIdx = useSelector((s:AppState) => s.scenario.activeScenarioIdx);
    var sID = scenarioID? scenarioID: activeIdx;
    const name = useSelector((s:AppState) => s.scenario.scenarios[sID].name);
    const [scenarioName, setScenarioName] = useState<string>(name);

    return  <Modal title="Rename Scenario"
        size={{ w: '520px', h: '240px'}}
        primaryAction={{
            name: "Save",
            func: () => dispatch(SetScenarioNameByIdx(sID, scenarioName))
        }}
        render={() =>{
            return <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Enter a new name for the selected scenario.</p>
                <p style={Label}>Scenario Name:</p>
                <input style={Input} type="text" value={scenarioName} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScenarioName(e.target.value)} />
            </div>;
        }
    }/>  
}
    
export default ScenarioRenameModal;