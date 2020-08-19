import { AppState } from '../../../../../../../store';
import React, { useState, useMemo, useEffect } from 'react';
import { InspectorSubViewProps } from '../../inspectorView';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Station } from '../../../../../leftPanel/components/componentView/constants';
import { UpdateStationByID } from '../../../../../leftPanel/components/componentView/actions';
import { SetInspectingIsActive } from '../../actions';
import { makeGetStationByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';

const StationInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getStationByID = useMemo(makeGetStationByIDSelector, [])
    const station = useSelector((state: AppState) =>  getStationByID(state, props.id), shallowEqual)
    const [editingObj, setEditingObj] = useState<Station>(station);
    useEffect(() => {
        if(!station) { dispatch(SetInspectingIsActive(false)); return; }
        if(props.id !== editingObj.id || editingObj.coordinates !== station.coordinates)
            setEditingObj(station);
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
                    ...(station.isLocked && { cursor: 'not-allowed' }),
                    ...(!station.isLocked && { cursor: 'text' })
                }} value={editingObj.name} disabled={station.isLocked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEditingObj({...editingObj, name: e.target.value})
                    }}/>
            </div>
            {/* <div style={FormEntry}>
                <p style={InputLabel}>Colour:</p>
                <SelectionInput<Colours> value={editingObj.colour}
                    options={ColourSet}
                    onChange={(e: Colours) => {}}/>
            </div> */}
            <div style={FormEntry}>
                <p style={InputLabel}>NodeID:</p>
                <input type="text" style={{
                    ...InputText,
                    ...(station.isLocked && { cursor: 'not-allowed' }),
                    ...(!station.isLocked && { cursor: 'text' })
                }} value={editingObj.coordinates.x} disabled={station.isLocked}
                    placeholder="X" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, coordinates: { 
                                ...editingObj.coordinates, x: num
                            }})
                    }}/>
                <input type="text" style={{
                    ...InputText, marginTop: '4px',
                    ...(station.isLocked && { cursor: 'not-allowed' }),
                    ...(!station.isLocked && { cursor: 'text' })
                }} value={editingObj.coordinates.y} disabled={station.isLocked}
                    placeholder="Y" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, coordinates: { 
                                ...editingObj.coordinates, y: num
                            }})
                    }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <button style={{
                ...SubmitBtn,
                ...(station.isLocked && {backgroundColor: '#666', cursor: 'not-allowed'}),
                ...(!station.isLocked && {backgroundColor: '#0abde3', cursor: 'pointer'})
            }} onClick={() => dispatch(
                UpdateStationByID(editingObj)
            )}>Save</button>
            <button style={ResetBtn} onClick={() => setEditingObj(station)}>Reset</button>
        </div>
    </div>
}

export default StationInspectorView;
