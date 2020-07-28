import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { InspectorSubViewProps } from '../../inspectorView';
import { Station } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetStationByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { AppState } from '../../../../../../../store';

const StationInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getStationByID = useMemo(makeGetStationByIDSelector, [])
    const station = useSelector((state: AppState) =>  getStationByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Station>(station)
    
    return <></>
}

export default StationInspectorView;