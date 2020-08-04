import React from 'react';
import { AppState } from '../../../../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SetActiveScenario, AddEmptyScenario } from '../../../../actions';
import {
    BaseStyle,
    ScenarioIcon,
    ScenarioList,
    ScenarioListElem,
    ScenarioListElemActive,
    ScenarioTitle
} from './scenarioSelector.css';
import './hover.anim.css';



const ScenarioSelector: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const scenario = useSelector((state: AppState) => { 
        const names = state.scenario.scenarios.map( s => s.name );
        return {idx: state.scenario.activeScenarioIdx, names: names }
    }, shallowEqual)

    return <div style={BaseStyle}> 
        <div style={ScenarioIcon} className="scenario-hover">
            <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <ul style={ScenarioList}>
        {
            scenario.names.map((k, i) => 
            <li key={i} style={{
                ...ScenarioListElem, 
                ...(i === scenario.idx && ScenarioListElemActive)}
            } className="scenario-hover" onClick={() => {
                if(i !== scenario.idx)
                    dispatch(SetActiveScenario(i))
            }}>
                <p style={ScenarioTitle}>{k}</p>
            </li>)
        }
        </ul>
        <div style={ScenarioIcon} className="scenario-hover"
            onClick={() => dispatch(AddEmptyScenario())}>
            <FontAwesomeIcon icon={faPlus} />
        </div>
    </div>;
}
    

export default ScenarioSelector;