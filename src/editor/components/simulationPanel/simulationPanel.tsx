import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabView } from '../../../app/components/tabView';
import {
    BaseStyle,
    PanelToggle,
    ToggleBtn
} from './simulationPanel.css';
import { 
    faAngleLeft, 
    faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';
import './hover.anim.css';

type SimulationPanel = {
    isCollapsed?: boolean
}

const SimulationPanel: React.FunctionComponent<SimulationPanel> = (props) => {
    return <div style={BaseStyle}>
        <div style={PanelToggle}>
            <div style={ToggleBtn} className="sim-panel-toggle-hover">
                <FontAwesomeIcon icon={ props.isCollapsed? faAngleLeft: faAngleRight} />
            </div>
        </div>
        <div style={{position: 'relative', left: '12px', height: '100%'}}>
            <TabView views={[ {header: "Simulation", view: (<>Hello, simulation!</>)} ]} />
        </div>
    </div>;
}

export default SimulationPanel;

