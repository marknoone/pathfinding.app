import React, { useState, useMemo, useEffect } from 'react';
import { AppState } from '../../../../../../../store';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { InspectorSubViewProps } from '../../inspectorView';
import { ArrayInput } from '../../../../../../../app/components/arrayInput';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { UpdateRouteByID } from '../../../../../leftPanel/components/componentView/actions';
import { Route, Station, Colours, ColourSet, TransitOptions, TransitModes, TimestampSelection, StationSelection } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetRouteByIDSelector, getStations } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
from '../../inspectorView.css';
import { SetInspectingIsActive } from '../../actions';
import { showModal } from '../../../../../../../modalManager/actions';
import { ModalType } from '../../../../../../../modalManager/constants';
import _ from 'lodash';

const RouteInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getRouteByID = useMemo(makeGetRouteByIDSelector, []);
    const route = useSelector((state: AppState) =>  getRouteByID(state, props.id), shallowEqual);
    const [editingObj, setEditingObj] = useState<Route>(route);

    useEffect(() => {
        if(!route) { dispatch(SetInspectingIsActive(false)); return; }
        if(route.id !== editingObj.id || !_.isEqual(route.departures, editingObj.departures) 
            || !_.isEqual(route.stations, editingObj.stations))
            setEditingObj(route);
    });
    
    return <div style={BaseStyle}>
        <div style={InspectorForm}>
            <div style={FormEntry}>
                <p style={InputLabel}>ID:</p>
                <input type="text" style={{...InputText, cursor: 'not-allowed'}} 
                    disabled={true} value={editingObj.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Name:</p>
                <input type="text" style={{
                    ...InputText,
                    ...(route.isLocked && { cursor: 'not-allowed' }),
                    ...(!route.isLocked && { cursor: 'pointer' })
                }} disabled={route.isLocked} value={editingObj.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEditingObj({...editingObj, name: editingObj.name})
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Mode:</p>
                <SelectionInput<TransitModes> value={editingObj.mode}
                    options={TransitOptions} disabled={route.isLocked}
                    onChange={(e: TransitModes) => { setEditingObj({...route, ...editingObj, mode: e})}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Colour:</p>
                <SelectionInput<Colours> value={editingObj.color}
                    options={ColourSet} disabled={route.isLocked}
                    onChange={(e: Colours) => { setEditingObj({...route, ...editingObj, color: e })}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Stations:</p>
                <ArrayInput<StationSelection> isOrdered={true} value={route.stations} 
                    name="Route Stations List:" disabled={route.isLocked}
                    onAdd={() => dispatch(showModal({modalProps: {routeID: route.id}, modalType: ModalType.ADD_STATION_TO_ROUTE_MODAL}))}
                    onChange={(e: {[key:number]: StationSelection}) => { dispatch(UpdateRouteByID({...route, stations: e})); }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Departures:</p>
                <ArrayInput<TimestampSelection> value={route.departures} 
                    name="Route Departures List:" disabled={route.isLocked}
                    onAdd={() => dispatch(showModal({modalProps: {routeID: route.id}, modalType: ModalType.ADD_DEPARTURE_TO_ROUTE_MODAL}))}
                    onChange={(e: {[key:number]: TimestampSelection}) => { dispatch(UpdateRouteByID({...route, departures: e})); }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button style={{
                ...SubmitBtn,
                ...(route.isLocked && {backgroundColor: '#666', cursor: 'not-allowed'}),
                ...(!route.isLocked && {backgroundColor: '#0abde3', cursor: 'pointer'})
            }} disabled={route.isLocked} onClick={() => dispatch(
                UpdateRouteByID(editingObj)
            )}>Save</button>
            <button style={ResetBtn} onClick={() => setEditingObj(route)}>Reset</button>
        </div>
    </div>
}

export default RouteInspectorView;

