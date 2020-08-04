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
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store';
import { SetComponentPanelCollapse } from '../../../app/store/layout/actions';

type LPPRops = {
    isCollapsed: boolean
}

const LeftPanel: React.FunctionComponent<LPPRops> = (props) => {
    const dispatch = useDispatch();
    
    return <div style={{
        ...BaseStyle, 
        ...(props.isCollapsed && {width: "12px"}),
        ...(!props.isCollapsed && {width: "100%"})
    }}>
        {
            props.isCollapsed? null:
            <TabView views={[
                {header: "Passengers", view: (<><PassengerView /></>)},
                {header: "Components", view: (<><ComponentView /></>)},
            ]} />
        }
        <div style={PanelToggle}>
            <div style={ToggleBtn} className="panel-toggle-hover" 
                onClick={() => dispatch(SetComponentPanelCollapse(!props.isCollapsed))}>
                <FontAwesomeIcon icon={ props.isCollapsed? faAngleRight: faAngleLeft} />
            </div>
        </div>
    </div>;
}

export default LeftPanel;