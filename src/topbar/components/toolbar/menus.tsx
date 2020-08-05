import { Dispatch } from 'react';
import {} from '../../../app/store/layout/actions';
import { DropdownMenuSection } from '../../../app/components/dropdownMenu/types';
import { SetCanvasScale } from '../../../editor/components/workspace/components/pathfindingCanvas/actions';
import { 
    AddEmptyRouteComponent,
    AddEmptyStationComponent,
    AddEmptyVehicleComponent
} from '../../../editor/components/leftPanel/components/componentView/actions';
import { AddEmptyPassengerToDirectory } from '../../../editor/components/leftPanel/components/passengerView/actions';
import { 
    SetComponentPanelCollapse,
    SetSimulationPanelCollapse,
    SetToolbarZoomLevelValue, 
    SetToolbarAddComponentValue,
    SetToolbarLayoutSelectValue 
} from '../../../app/store/layout/actions'; 

type MenuSectionDefintions = {
    [key: string]: DropdownMenuSection[]
}

export const GetMenuSectionDefinitions = (dispatch: Dispatch<any>, panelVals: {lp: boolean, rp: boolean}) => {
    return {
        "panels":[
            {
                entries: [
                    { title: "Passenger/Component Panel", value: panelVals.lp, onClick: () => { 
                        dispatch(SetComponentPanelCollapse(!panelVals.lp)); 
                        dispatch(SetToolbarLayoutSelectValue(false)); 
                    }},
                    { title: "Inspector/Simulation Panel", value: panelVals.rp, onClick: () => { 
                        dispatch(SetSimulationPanelCollapse(!panelVals.rp)); 
                        dispatch(SetToolbarLayoutSelectValue(false)); 
                    }},
            ]}
        ],
        "zoomSelection":[
            {
                entries: [
                    { title: "25%", onClick: () => { dispatch(SetCanvasScale(0.25, 0.25)); dispatch(SetToolbarZoomLevelValue(false)); }},
                    { title: "50%", onClick: () => { dispatch(SetCanvasScale(0.5, 0.5)); dispatch(SetToolbarZoomLevelValue(false));}},
                    { title: "75%", onClick: () => { dispatch(SetCanvasScale(0.75, 0.75)); dispatch(SetToolbarZoomLevelValue(false));}},
                    { title: "100%", onClick: () => { dispatch(SetCanvasScale(1.0, 1.0)); dispatch(SetToolbarZoomLevelValue(false));}},
                    { title: "150%", onClick: () => { dispatch(SetCanvasScale(1.5, 1.5)); dispatch(SetToolbarZoomLevelValue(false));}},
                    { title: "200%", onClick: () => { dispatch(SetCanvasScale(2.0, 2.0)); dispatch(SetToolbarZoomLevelValue(false));}},
                    { title: "400%", onClick: () => { dispatch(SetCanvasScale(4.0, 4.0)); dispatch(SetToolbarZoomLevelValue(false));}},
            ]},
        ],
        "addElement":[
            { entries: [
                    { title: "Passenger", onClick: () => { dispatch(AddEmptyPassengerToDirectory(0)); dispatch(SetToolbarAddComponentValue(false)); }},
                    { title: "Station",   onClick: () => { dispatch(AddEmptyStationComponent()); dispatch(SetToolbarAddComponentValue(false)); }},
                    { title: "Route",     onClick: () => { dispatch(AddEmptyRouteComponent()); dispatch(SetToolbarAddComponentValue(false)); }},
                    { title: "Vehicle",   onClick: () => { dispatch(AddEmptyVehicleComponent()); dispatch(SetToolbarAddComponentValue(false)); }}
            ]}
        ],
    }
}