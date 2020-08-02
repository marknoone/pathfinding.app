import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { Vehicle } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetVehicleByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';

const VehicleInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getVehicleByID = useMemo(makeGetVehicleByIDSelector, [])
    const vehicle = useSelector((state: AppState) =>  getVehicleByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Vehicle>(vehicle)
    
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
                <p style={InputLabel}>Capacity:</p>
                <input type="text" style={InputText} value={editingObj.capacity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, capacity: num}) }
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Glyph:</p>
                <SelectionInput<string> value={editingObj.glyph}
                    options={[]}
                    onChange={(e: string) => {}}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button  style={SubmitBtn}>Submit</button>
            <button  style={ResetBtn}>Reset</button>
        </div>
    </div>
}

export default VehicleInspectorView;