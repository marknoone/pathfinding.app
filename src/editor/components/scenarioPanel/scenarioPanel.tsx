import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabView } from '../../../app/components/tabView';
import {
    BaseStyle,
    PanelToggle,
    ToggleBtn
} from './scenarioPanel.css';
import { 
    faAngleLeft, 
    faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';
import './hover.anim.css';

type ScenarioPanel = {
    isCollapsed?: boolean
}

const ScenarioPanel: React.FunctionComponent<ScenarioPanel> = (props) => {
    return <div style={BaseStyle}>
        <TabView views={[
            {header: "Inspector", view: (<>Hello, inspector!</>)},
            {header: "Entities", view: (<>Hello, entities!</>)},
        ]} />
        <div style={PanelToggle}>
            <div style={ToggleBtn} className="panel-toggle-hover">
                <FontAwesomeIcon icon={ props.isCollapsed? faAngleRight: faAngleLeft} />
            </div>
        </div>
    </div>;
}

export default ScenarioPanel;