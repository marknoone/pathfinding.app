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
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { SetComponentPanelCollapse, SetSimulationPanelCollapse } from '../../../app/store/layout/actions';

type RPPRops = {
    isCollapsed: boolean
}

const RightPanel: React.FunctionComponent<RPPRops> = (props) => {
    const dispatch = useDispatch();

    return <div style={{
            ...BaseStyle, 
            ...(props.isCollapsed && {width: "12px"}),
            ...(!props.isCollapsed && {width: "100%"})
        }}>
        <div style={PanelToggle}>
            <div style={ToggleBtn} className="sim-panel-toggle-hover"
                onClick={() => dispatch(SetSimulationPanelCollapse(!props.isCollapsed))}>
                <FontAwesomeIcon icon={ props.isCollapsed? faAngleLeft: faAngleRight} />
            </div>
        </div>
        {
            props.isCollapsed? null:
            <div style={{position: 'relative', left: '12px', height: '100%'}}>
                <TabView views={[ 
                    {header: "Inspector", view: (<><InspectorView /></>)},
                    {header: "Simulation", view: (<><SimulationView /></>)}
                ]} />
            </div>
        }
    </div>;
}

export default RightPanel;

