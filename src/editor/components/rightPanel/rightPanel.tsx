import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabView } from '../../../app/components/tabView';
import { SimulationView } from './components/simulationView';
import { InspectorView } from './components/inspectorView';
import {
    BaseStyle,
    PanelToggle,
    ToggleBtn
} from './rightPanel.css';
import { 
    faAngleLeft, 
    faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';
import './hover.anim.css';

type RightPanel = {
    isCollapsed?: boolean
}

const RightPanel: React.FunctionComponent<RightPanel> = (props) => {
    return <div style={BaseStyle}>
        <div style={PanelToggle}>
            <div style={ToggleBtn} className="sim-panel-toggle-hover">
                <FontAwesomeIcon icon={ props.isCollapsed? faAngleLeft: faAngleRight} />
            </div>
        </div>
        <div style={{position: 'relative', left: '12px', height: '100%'}}>
            <TabView views={[ 
                {header: "Inspector", view: (<><InspectorView /></>)},
                {header: "Simulation", view: (<><SimulationView /></>)}
            ]} />
        </div>
    </div>;
}

export default RightPanel;

