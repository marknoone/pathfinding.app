import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView'
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { Passenger } from '../../../../../leftPanel/components/passengerView/constants';
import { makeGetPassengerElemByIDSelector } from '../../../../../leftPanel/components/passengerView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';

const PassengerInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getPassengerElemByID = useMemo(makeGetPassengerElemByIDSelector, [])
    const passenger = useSelector((state: AppState) =>  
        getPassengerElemByID(state, props.id)) as Passenger;
    const [editingObj, setEditingObj] = useState<Passenger>(passenger)
   
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
                <SelectionInput<number> value={editingObj.start}
                    onChange={(e: number) => {}}
                    options={[
                        {s: "test-0", value: 0}, {s: "test-1", value: 1}, 
                        {s: "test-2", value: 2}, {s: "test-3", value: 3},
                        {s: "test-4", value: 4}, {s: "test-5", value: 5},
                    ]}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Destination:</p>
                <SelectionInput<number> value={editingObj.destination}
                    onChange={(e: number) => {}}
                    options={[
                        {s: "test-0", value: 0}, {s: "test-1", value: 1}, 
                        {s: "test-2", value: 2}, {s: "test-3", value: 3},
                        {s: "test-4", value: 4}, {s: "test-5", value: 5},
                    ]}/>
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
            <button style={SubmitBtn}>Save</button>
            <button style={ResetBtn}>Reset</button>
        </div>
    </div>
}

export default PassengerInspectorView;

