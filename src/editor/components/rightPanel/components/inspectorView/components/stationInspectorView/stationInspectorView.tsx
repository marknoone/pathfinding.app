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
                <SelectionInput<number> value={editingObj.nodeID}
                    options={[]}
                    onChange={(e: number) => {}}/>
            </div>
        </div>
        <div style={FormButtons}>
            <a style={SubmitBtn}>Save</a>
            <a style={ResetBtn}>Reset</a>
        </div>
    </div>
}

export default StationInspectorView;
