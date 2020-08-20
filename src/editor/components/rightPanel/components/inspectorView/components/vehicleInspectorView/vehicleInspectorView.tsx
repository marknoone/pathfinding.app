import { AppState } from '../../../../../../../store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useMemo, useEffect } from 'react';
import { InspectorSubViewProps } from '../../inspectorView';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { Vehicle } from '../../../../../leftPanel/components/componentView/constants';
import { UpdateVehicleByID } from '../../../../../leftPanel/components/componentView/actions';
import { makeGetVehicleByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText,
    LOSInputText } from '../../inspectorView.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { SetInspectingIsActive } from '../../actions';

const VehicleInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getVehicleByID = useMemo(makeGetVehicleByIDSelector, [])
    const vehicle = useSelector((state: AppState) =>  getVehicleByID(state, props.id))
    const isSimulating = useSelector((state: AppState) =>  
        state.scenario.scenarios[state.scenario.activeScenarioIdx].simulation.isSimulating)
    const [editingObj, setEditingObj] = useState<Vehicle>(vehicle)
    useEffect(() => {
        if(!vehicle) { dispatch(SetInspectingIsActive(false)); return; }
        if(props.id !== editingObj.id)
            setEditingObj(vehicle);
    });
    

    const disabled =  vehicle.isLocked || isSimulating;
    return <div style={BaseStyle}>
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
                }} value={editingObj.name}
                    disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEditingObj({...editingObj, name: e.target.value})
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Capacity:</p>
                <input type="text" style={{
                    ...InputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.capacity}
                    disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, capacity: num}) }
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Glyph:</p>
                <SelectionInput<IconDefinition> value={editingObj.glyph}
                    disabled={disabled}
                    options={[
                        { s: "Archive", value: faArchive}
                    ]}
                    onChange={(e: IconDefinition) => setEditingObj({...editingObj, glyph: e})}/>
            </div>
            <p style={InputLabel}>LoS Values:</p>
            <div style={FormEntry}>
                <p style={{...InputLabel, display: 'inline-block', fontWeight: 400, fontSize: '12px'}}>LoS A:</p>
                <input type="text" style={{
                    ...InputText,
                    ...LOSInputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.LOS.A} disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, LOS: {...editingObj.LOS, A: num}}) }
                }}/>
            </div>
            <div style={FormEntry}>
                <p style={{...InputLabel, display: 'inline-block', fontWeight: 400, fontSize: '12px'}}>LoS B:</p>
                <input type="text" style={{
                    ...InputText,
                    ...LOSInputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.LOS.B} disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, LOS: {...editingObj.LOS, B: num}}) }
                }}/>
            </div>
            <div style={FormEntry}>
                <p style={{...InputLabel, display: 'inline-block', fontWeight: 400, fontSize: '12px'}}>LoS C:</p>
                <input type="text" style={{
                    ...InputText,
                    ...LOSInputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.LOS.C} disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, LOS: {...editingObj.LOS, C: num}}) }
                }}/>
            </div>
            <div style={FormEntry}>
                <p style={{...InputLabel, display: 'inline-block', fontWeight: 400, fontSize: '12px'}}>LoS D:</p>
                <input type="text" style={{
                    ...InputText,
                    ...LOSInputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.LOS.D} disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, LOS: {...editingObj.LOS, D: num}}) }
                }}/>
            </div>
            <div style={FormEntry}>
                <p style={{...InputLabel, display: 'inline-block', fontWeight: 400, fontSize: '12px'}}>LoS E:</p>
                <input type="text" style={{
                    ...InputText,
                    ...LOSInputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.LOS.E} disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, LOS: {...editingObj.LOS, E: num}}) }
                }}/>
            </div>
            <div style={FormEntry}>
                <p style={{...InputLabel, display: 'inline-block', fontWeight: 400, fontSize: '12px'}}>LoS F:</p>
                <input type="text" style={{
                    ...InputText,
                    ...LOSInputText,
                    ...(disabled && { cursor: 'not-allowed' }),
                    ...(!disabled && { cursor: 'text' })
                }}  value={editingObj.LOS.F} disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num)){ setEditingObj({...editingObj, LOS: {...editingObj.LOS, F: num}}) }
                }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button  style={{
                ...SubmitBtn,
                ...(disabled && {backgroundColor: '#666', cursor: 'not-allowed'}),
                ...(!disabled && {backgroundColor: '#0abde3', cursor: 'pointer'})
            }} disabled={disabled} onClick={() => dispatch(
                UpdateVehicleByID(editingObj)
            )}>Save</button>
            <button  style={ResetBtn} onClick={() => setEditingObj(vehicle)}>Reset</button>
        </div>
    </div>
}

export default VehicleInspectorView;