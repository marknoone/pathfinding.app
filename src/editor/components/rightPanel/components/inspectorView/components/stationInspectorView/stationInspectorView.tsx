import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import React, { useState, useMemo, useEffect } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView';
import { Station, Colours } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetStationByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { UpdateStationByID } from '../../../../../leftPanel/components/componentView/actions';
import { ColourSet } from '../../../../../leftPanel/components/componentView/constants'; 
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';

const StationInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const dispatch = useDispatch();
    const getStationByID = useMemo(makeGetStationByIDSelector, [])
    const station = useSelector((state: AppState) =>  getStationByID(state, props.id), shallowEqual)
    const [editingObj, setEditingObj] = useState<Station>(station);
    useEffect(() => {
        if(props.id !== editingObj.id)
            setEditingObj(station);
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
            {/* <div style={FormEntry}>
                <p style={InputLabel}>Colour:</p>
                <SelectionInput<Colours> value={editingObj.colour}
                    options={ColourSet}
                    onChange={(e: Colours) => {}}/>
            </div> */}
            <div style={FormEntry}>
                <p style={InputLabel}>NodeID:</p>
                <input type="text" style={InputText} value={editingObj.coordinates.x}
                    placeholder="X" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = parseInt(e.target.value, 10); 
                        if (!isNaN(num))
                            setEditingObj({...editingObj, coordinates: { 
                                ...editingObj.coordinates, x: num
                            }})
                    }}/>
                <input type="text" style={InputText} value={editingObj.coordinates.y}
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
            <button style={SubmitBtn} onClick={() => dispatch(
                UpdateStationByID(editingObj)
            )}>Save</button>
            <button style={ResetBtn} onClick={() => setEditingObj(station)}>Reset</button>
        </div>
    </div>
}

export default StationInspectorView;
