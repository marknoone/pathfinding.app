import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView';
import { Station } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetStationByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';

const StationInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getStationByID = useMemo(makeGetStationByIDSelector, [])
    const station = useSelector((state: AppState) =>  getStationByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Station>(station)
    
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
                <p style={InputLabel}>Colour:</p>
                <SelectionInput<string> value={editingObj.colour}
                    options={[]}
                    onChange={(e: string) => {}}/>
            </div>
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
            <button style={SubmitBtn}>Save</button>
            <button style={ResetBtn}>Reset</button>
        </div>
    </div>
}

export default StationInspectorView;
