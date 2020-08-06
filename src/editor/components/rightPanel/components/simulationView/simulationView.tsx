import React, { useState }from 'react';
import { Algorithms, Playspeeds } from './constants';
import { AppState } from '../../../../../store';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownMenu } from '../../../../../app/components/dropdownMenu';
import { faPlay, faForward, faStepForward, faBackward, 
    faStepBackward, faCaretDown, faStop} from '@fortawesome/free-solid-svg-icons';
import { SetSimulationAlgorithm, IncPlaySpeed, DecPlaySpeed, IncSimulationFrame, 
    DecSimulationFrame, SetIsPlaying } from './actions';
import {
    BaseStyle,
    SimText,
    SimSection,
    SimHeader,
    SimBtn,
    SimPlaybackCtrl,
    SimPlaybackCtrlList,
    SimPlaybackCtrlElem
} from './simulationView.css';

const AlgorithmNames = {
    1: "Dijkstra",
    2: "TD-Dijkstra",
    3: "MM-TD-Dijkstra",
    4: "CMT-Dijkstra"
}

const SimulationView: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const [isDropdownShowing, setIsDropdownShowing] = useState(false);
    const config = useSelector((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx].simulationConfig, shallowEqual)
    
    const setAlg = (a: Algorithms) => { dispatch(SetSimulationAlgorithm(a)); setIsDropdownShowing(false); } 
    return <div style={BaseStyle}>
        <div style={SimSection}>
            <p style={SimHeader}>Algorithm</p>
            <p style={SimText}> Currently selected:
            <DropdownMenu 
                render={ () => <>
                    <span style={{...SimText, fontWeight: 600, color: '#464646'}}>{AlgorithmNames[config.algorithm]}</span>
                    <span style={{ paddingLeft: '8px'}}><FontAwesomeIcon icon={faCaretDown} /></span>
                </>} 
                isActive={isDropdownShowing}
                onBtnClick={() => {setIsDropdownShowing(!isDropdownShowing)}}
                sections={[{entries: [
                            { title: "Dijkstra",        onClick: () => setAlg(Algorithms.Dijkstra)},
                            { title: "TD-Dijkstra",     onClick: () => setAlg(Algorithms.TimeDependentDijkstra)},
                            { title: "MM-TD-Dijkstra",  onClick: () => setAlg(Algorithms.MultiModalTimeDependentDijkstra)},
                            { title: "CMT-Dijkstra",    onClick: () => setAlg(Algorithms.CMTDijkstra)},
                    ]},
                ]}/>
            </p> 
            {/* <p style={SimHeader}>Options:</p> */}
        </div>
        <div style={{...SimSection}}>
            <p style={SimHeader}>Controls (Speed: {Playspeeds[config.playSpeedIdx]}x, Frame: {config.simFrame})</p>
            <button style={{...SimBtn, backgroundColor: '#ff9f43', marginTop: '24px'}}>Bake</button>
            <button style={{...SimBtn, backgroundColor: '#10ac84'}}>Simulate</button>
            <div style={SimPlaybackCtrl}>
                <ul style={SimPlaybackCtrlList}>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(DecSimulationFrame())}> <FontAwesomeIcon icon={faStepBackward}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(DecPlaySpeed())}> <FontAwesomeIcon icon={faBackward}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(SetIsPlaying(!config.isPlaying))}> <FontAwesomeIcon icon={config.isPlaying?faStop:faPlay}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(IncPlaySpeed())}> <FontAwesomeIcon icon={faForward}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(IncSimulationFrame())}> <FontAwesomeIcon icon={faStepForward}/> </li>
                </ul>
            </div>
        </div>
    </div>;
}

export default SimulationView;