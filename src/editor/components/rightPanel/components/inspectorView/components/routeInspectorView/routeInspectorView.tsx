import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView';
import { Route } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetRouteByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';

const RouteInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getRouteByID = useMemo(makeGetRouteByIDSelector, [])
    const route = useSelector((state: AppState) =>  getRouteByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Route>(route)
    
    return <></>
}

export default RouteInspectorView;