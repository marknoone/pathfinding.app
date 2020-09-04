import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import React, { useState, useMemo, useEffect } from 'react';
import { AppState } from '../../../../../../../store';
import { SetInspectingIsActive } from '../../actions';
import { InspectorSubViewProps } from '../../inspectorView';
import { Passenger } from '../../../../../leftPanel/components/passengerView/constants';
import { UpdatePassengerWithID } from '../../../../../leftPanel/components/passengerView/actions';
import { makeGetPassengerElemByIDSelector } from '../../../../../leftPanel/components/passengerView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';
import _ from 'lodash';

const PassengerInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getPassengerElemByID = useMemo(makeGetPassengerElemByIDSelector, [])
    const passenger = useSelector((state: AppState) =>  
        getPassengerElemByID(state, props.id), shallowEqual) as Passenger;
    const isSimulating = useSelector((state: AppState) =>  
        state.scenario.scenarios[state.scenario.activeScenarioIdx].simulation.isSimulating)
    const [editingObj, setEditingObj] = useState<Passenger>(passenger)
    
    useEffect(() => {
        if(!passenger) { dispatch(SetInspectingIsActive(false)); return; }
        if(props.id !== editingObj.id || !_.isEqual(passenger.destination, editingObj.destination) 
        || !_.isEqual(passenger.start, editingObj.start))
            setEditingObj(passenger);
    });
    if(!passenger)
        return null

    const disabled =  passenger.isLocked || isSimulating;
    return !passenger?null:<div style={BaseStyle}>
        <div style={InspectorForm}>
            <div style={FormEntry}>
                <p style={InputLabel}>ID:</p>
                <input type="text" style={{...InputText, cursor: 'not-allowed'}} disabled={true} value={editingObj.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Name:</p>
                <input type="text" style={{
                    ...InputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }} disabled={disabled} value={editingObj.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEditingObj({...editingObj, name: e.target.value})
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Start:</p>
                <input type="text" style={{
                    ...InputText,
                    ...{marginBottom: '4px'},
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }} disabled={disabled} value={editingObj.start.x}
                    placeholder={"X:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, start: {
                                ...editingObj.start, x: num 
                            }}) 
                    }}/>
                <input type="text" style={{
                    ...InputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }} disabled={disabled} value={editingObj.start.y}
                    placeholder={"Y:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, start: {
                                ...editingObj.start, y: num 
                            }}) 
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Destination:</p>
                <input type="text" style={{
                    ...InputText,
                    ...{marginBottom: '4px'},
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }} disabled={disabled} value={editingObj.destination.x}
                    placeholder={"X:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, destination: {
                                ...editingObj.destination, x: num 
                            }}) 
                    }}/>
                <input type="text" style={{
                    ...InputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }} disabled={disabled} value={editingObj.destination.y}
                    placeholder={"Y:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, destination: {
                                ...editingObj.destination, y: num 
                            }}) 
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Time Of Departure:</p>
                <input type="text" style={{
                    ...InputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }} disabled={disabled} value={editingObj.tod}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, tod: num}) }
                    }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button style={{
                ...SubmitBtn,
                ...(disabled && {backgroundColor: '#666', cursor: 'not-allowed'}),
                ...(!disabled && {backgroundColor: '#0abde3', cursor: 'pointer'})
            }} disabled={disabled} onClick={() => dispatch(
                UpdatePassengerWithID(editingObj)
            )}>Save</button>
            <button style={ResetBtn} onClick={() => setEditingObj(passenger)}>Reset</button>
        </div>
    </div>
}

export default PassengerInspectorView;

