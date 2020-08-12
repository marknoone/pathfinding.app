import React, { useState, useMemo, useEffect } from 'react';
import { AppState } from '../../../../../../../store';
import { useSelector, useDispatch } from 'react-redux';
import { InspectorSubViewProps } from '../../inspectorView';
import { ArrayInput } from '../../../../../../../app/components/arrayInput';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { UpdateRouteByID } from '../../../../../leftPanel/components/componentView/actions';
import { Route, Station, Colours, ColourSet, TransitOptions, TransitModes, TimestampSelection } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetRouteByIDSelector, getStations } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
from '../../inspectorView.css';
import { SetInspectingIsActive } from '../../actions';
import { showModal } from '../../../../../../../modalManager/actions';
import { ModalType } from '../../../../../../../modalManager/constants';

const RouteInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getRouteByID = useMemo(makeGetRouteByIDSelector, [])
    const route = useSelector((state: AppState) =>  getRouteByID(state, props.id))
    const stations = useSelector((state: AppState) => getStations(state))
    const [editingObj, setEditingObj] = useState<Route>(route)
    const [dummy, setDummy] = useState<{[key:number]: Station}>({
        1: { id: 1, name: "Station-1", coordinates: {x: 50, y: 50} },
        2: { id: 2, name: "Station-2", coordinates: {x: 150, y: 150} },
        3: { id: 3, name: "Station-3", coordinates: {x: 250, y: 250} }
    });

    useEffect(() => {
        if(!route) { dispatch(SetInspectingIsActive(false)); return; }
        if(props.id !== editingObj.id)
            setEditingObj(route);
    });
    
    return <div style={BaseStyle}>
        <div style={InspectorForm}>
            <div style={FormEntry}>
                <p style={InputLabel}>ID:</p>
                <input type="text" style={InputText} disabled={true} value={editingObj.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Name:</p>
                <input type="text" style={InputText} value={editingObj.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEditingObj({...editingObj, name: editingObj.name})
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Mode:</p>
                <SelectionInput<TransitModes> value={editingObj.mode}
                    options={TransitOptions}
                    onChange={(e: TransitModes) => { setEditingObj({...editingObj, mode: e})}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Colour:</p>
                <SelectionInput<Colours> value={editingObj.color}
                    options={ColourSet}
                    onChange={(e: Colours) => { setEditingObj({...editingObj, color: e })}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Stations:</p>
                <ArrayInput<Station> isOrdered={true} value={dummy} name="Route Stations List:"
                    onAdd={() => dispatch(showModal({modalProps: {routeID: route.id}, modalType: ModalType.ADD_STATION_TO_ROUTE_MODAL}))}
                    onChange={(e: {[key:number]: Station}) => { setDummy(e); }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Departures:</p>
                <ArrayInput<TimestampSelection> value={route.departures} name="Route Departures List:"
                    onAdd={() => dispatch(showModal({modalProps: {routeID: route.id}, modalType: ModalType.ADD_DEPARTURE_TO_ROUTE_MODAL}))}
                    onChange={(e: {[key:number]: TimestampSelection}) => { dispatch(UpdateRouteByID({...route, departures: e})); }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button style={SubmitBtn} onClick={() => dispatch(
                UpdateRouteByID(editingObj)
            )}>Save</button>
            <button style={ResetBtn} onClick={() => setEditingObj(route)}>Reset</button>
        </div>
    </div>
}

export default RouteInspectorView;

