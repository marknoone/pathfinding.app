import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabView } from '../../../app/components/tabView';
import { PassengerView } from './components/passengerView';
import { ComponentView } from './components/componentView';
import {
    BaseStyle,
    PanelToggle,
    ToggleBtn
} from './leftPanel.css';
import { 
    faAngleLeft, 
    faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';
import './hover.anim.css';

type LeftPanel = {
    isCollapsed?: boolean
}

const LeftPanel: React.FunctionComponent<LeftPanel> = (props) => {
    return <div style={BaseStyle}>
        <TabView views={[
            // {header: "Passengers", view: (<><PassengerView /></>)},
            {header: "Components", view: (<><ComponentView /></>)},
        ]} />
        <div style={PanelToggle}>
            <div style={ToggleBtn} className="panel-toggle-hover">
                <FontAwesomeIcon icon={ props.isCollapsed? faAngleRight: faAngleLeft} />
            </div>
        </div>
    </div>;
}

export default LeftPanel;