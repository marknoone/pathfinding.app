import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { InspectorSubViewProps } from '../../inspectorView';
import { Vehicle } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetVehicleByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { AppState } from '../../../../../../../store';

const VehicleInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getVehicleByID = useMemo(makeGetVehicleByIDSelector, [])
    const vehicle = useSelector((state: AppState) =>  getVehicleByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Vehicle>(vehicle)
    
    return <></>
}

export default VehicleInspectorView;