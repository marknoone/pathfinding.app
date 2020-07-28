import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../../store';
import { ComponentTypes } from '../../../../constants';
import { VehicleInspectorView } from './components/vehicleInspectorView';
import { RouteInspectorView } from './components/routeInspectorView';
import { StationInspectorView } from './components/stationInspectorView';
import { PassengerInspectorView } from './components/passengerInspectorView';

const InspectorView: React.FunctionComponent = (props) => {
    const dispatch = useDispatch()
    const inspectingID = useSelector((state: AppState) => state.inspector.elementID)
    const inspectingType = useSelector((state: AppState) => state.inspector.componentType)

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
