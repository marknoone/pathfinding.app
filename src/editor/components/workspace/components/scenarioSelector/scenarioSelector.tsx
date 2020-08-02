import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    BaseStyle,
    ScenarioIcon,
    ScenarioList,
    ScenarioListElem,
    ScenarioListElemActive,
    ScenarioTitle
} from './scenarioSelector.css';
import './hover.anim.css';

const Scenarios = ["Scenario-1", "Scenario-2"];
const ScenarioSelector: React.FunctionComponent = (props) => 
    <div style={BaseStyle}> 
        <div style={ScenarioIcon} className="scenario-hover">
            <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <ul style={ScenarioList}>
        {
            Scenarios.map((k, i) => 
            <li key={i} style={{...ScenarioListElem, ...(i === 1 && ScenarioListElemActive)}} className="scenario-hover">
                <p style={ScenarioTitle}>{k}</p>
            </li>)
        }
        </ul>
        <div style={ScenarioIcon} className="scenario-hover">
            <FontAwesomeIcon icon={faPlus} />
        </div>
    </div>;

export default ScenarioSelector;