import React, { useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownMenu } from '../../../../../app/components/dropdownMenu';
import { faPlay, faForward, faStepForward, faBackward, 
        faStepBackward, faCaretDown} from '@fortawesome/free-solid-svg-icons';
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


const SimulationView: React.FunctionComponent = (props) => {
    const [isDropdownShowing, setIsDropdownShowing] = useState(false);

    return <div style={BaseStyle}>
        <div style={SimSection}>
            <p style={SimHeader}>Algorithm</p>
            <p style={SimText}> Currently selected:
            <DropdownMenu 
                render={ () => <>
                    <span style={{...SimText, fontWeight: 600, color: '#464646'}}>Dijkstra</span>
                    <span style={{ paddingLeft: '8px'}}><FontAwesomeIcon icon={faCaretDown} /></span>
                </>} 
                isActive={isDropdownShowing}
                onBtnClick={() => {setIsDropdownShowing(!isDropdownShowing)}}
                sections={[{entries: [
                            { title: "Dijkstra", onClick: () => {}},
                            { title: "TD-Dijkstra", onClick: () => {}}
                    ]},
                ]}/>
            </p> 
            {/* <p style={SimHeader}>Options:</p> */}
        </div>
        <div style={{...SimSection}}>
            <p style={SimHeader}>Controls</p>
            <button style={{...SimBtn, backgroundColor: '#ff9f43', marginTop: '24px'}}>Bake</button>
            <button style={{...SimBtn, backgroundColor: '#10ac84'}}>Simulate</button>
            <div style={SimPlaybackCtrl}>
                <ul style={SimPlaybackCtrlList}>
                    <li style={SimPlaybackCtrlElem}><FontAwesomeIcon icon={faStepBackward}/></li>
                    <li style={SimPlaybackCtrlElem}><FontAwesomeIcon icon={faBackward}/></li>
                    <li style={SimPlaybackCtrlElem}><FontAwesomeIcon icon={faPlay}/></li>
                    <li style={SimPlaybackCtrlElem}><FontAwesomeIcon icon={faForward}/></li>
                    <li style={SimPlaybackCtrlElem}><FontAwesomeIcon icon={faStepForward}/></li>
                </ul>
            </div>
        </div>
    </div>;
}

export default SimulationView;