import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import { ComponentTypes } from '../../../../constants';
import { VehicleInspectorView } from './components/vehicleInspectorView';
import { RouteInspectorView } from './components/routeInspectorView';
import { StationInspectorView } from './components/stationInspectorView';
import { PassengerInspectorView } from './components/passengerInspectorView';

const InspectorView: React.FunctionComponent = (props) => {
    const isActive = useSelector((state: AppState) => state.inspector.active)
    const inspectingID = useSelector((state: AppState) => state.inspector.elementID)
    const inspectingType = useSelector((state: AppState) => state.inspector.componentType)

    if(!isActive)
        return <div style={{padding: '16px 8px'}}>
            <p style={{
                fontFamily: "'Open-sans', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                color: '#464646'
            }}>Please select a scene object.</p>
        </div>


    switch(inspectingType){
        case ComponentTypes.PASSENGER:
            return <PassengerInspectorView id={inspectingID} />;
        case ComponentTypes.STATION:
            return <StationInspectorView id={inspectingID} />;
        case ComponentTypes.ROUTE:
            return <RouteInspectorView id={inspectingID} />;
        case ComponentTypes.VEHICLE:
            return <VehicleInspectorView id={inspectingID} />;
        default:
            return <></>
    }
}

export default InspectorView;
export type InspectorSubViewProps = { id: number };
