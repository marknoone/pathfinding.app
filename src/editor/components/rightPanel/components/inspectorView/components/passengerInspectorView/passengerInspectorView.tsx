import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useMemo, useEffect } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView';
import { Passenger } from '../../../../../leftPanel/components/passengerView/constants';
import { UpdatePassengerWithID } from '../../../../../leftPanel/components/passengerView/actions';
import { makeGetPassengerElemByIDSelector } from '../../../../../leftPanel/components/passengerView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';

const PassengerInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getPassengerElemByID = useMemo(makeGetPassengerElemByIDSelector, [])
    const passenger = useSelector((state: AppState) =>  
        getPassengerElemByID(state, props.id)) as Passenger;
    const [editingObj, setEditingObj] = useState<Passenger>(passenger)
    useEffect(() => {
        if(props.id !== editingObj.id)
            setEditingObj(passenger);
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
                        setEditingObj({...editingObj, name: e.target.value})
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Start:</p>
                <input type="text" style={InputText} value={editingObj.start.x}
                    placeholder={"X:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, start: {
                                ...editingObj.start, x: num 
                            }}) 
                    }}/>
                <input type="text" style={InputText} value={editingObj.start.y}
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
                <input type="text" style={InputText} value={editingObj.destination.x}
                    placeholder={"X:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, start: {
                                ...editingObj.destination, x: num 
                            }}) 
                    }}/>
                <input type="text" style={InputText} value={editingObj.destination.y}
                    placeholder={"Y:"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, start: {
                                ...editingObj.destination, y: num 
                            }}) 
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Time Of Departure:</p>
                <input type="text" style={InputText} value={editingObj.tod}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, tod: num}) }
                    }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button style={SubmitBtn} onClick={() => dispatch(
                UpdatePassengerWithID(editingObj)
            )} >Save</button>
            <button style={ResetBtn} onClick={() => setEditingObj(passenger)}>Reset</button>
        </div>
    </div>
}

export default PassengerInspectorView;

