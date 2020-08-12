import { AppState } from '../../../../../../../store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useMemo, useEffect } from 'react';
import { InspectorSubViewProps } from '../../inspectorView';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { Vehicle } from '../../../../../leftPanel/components/componentView/constants';
import { UpdateVehicleByID } from '../../../../../leftPanel/components/componentView/actions';
import { makeGetVehicleByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { SetInspectingIsActive } from '../../actions';

const VehicleInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getVehicleByID = useMemo(makeGetVehicleByIDSelector, [])
    const vehicle = useSelector((state: AppState) =>  getVehicleByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Vehicle>(vehicle)
    useEffect(() => {
        if(!vehicle) { dispatch(SetInspectingIsActive(false)); return; }
        if(props.id !== editingObj.id)
            setEditingObj(vehicle);
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
                <p style={InputLabel}>Capacity:</p>
                <input type="text" style={InputText} value={editingObj.capacity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, capacity: num}) }
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Glyph:</p>
                <SelectionInput<IconDefinition> value={editingObj.glyph}
                    options={[
                        { s: "Archive", value: faArchive}
                    ]}
                    onChange={(e: IconDefinition) => setEditingObj({...editingObj, glyph: e})}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button  style={SubmitBtn} onClick={() => dispatch(
                UpdateVehicleByID(editingObj)
            )}>Save</button>
            <button  style={ResetBtn} onClick={() => setEditingObj(vehicle)}>Reset</button>
        </div>
    </div>
}

export default VehicleInspectorView;