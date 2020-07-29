import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView';
import { SelectionInput } from '../../../../../../../app/components/selectionInput';
import { ArrayInput } from '../../../../../../../app/components/arrayInput';
import { Route, Station } from '../../../../../leftPanel/components/componentView/constants';
import { makeGetRouteByIDSelector } from '../../../../../leftPanel/components/componentView/selectors';
import { BaseStyle, InspectorForm, FormButtons, SubmitBtn, ResetBtn, FormEntry, InputLabel, InputText } 
    from '../../inspectorView.css';

const RouteInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const getRouteByID = useMemo(makeGetRouteByIDSelector, [])
    const route = useSelector((state: AppState) =>  getRouteByID(state, props.id))
    const [editingObj, setEditingObj] = useState<Route>(route)
    const [dummy, setDummy] = useState<{[key:number]: Station}>({
        1: { id: 1, name: "Station-1", colour: "#ff9f43", nodeID: 1 },
        2: { id: 2, name: "Station-2", colour: "#1dd1a1", nodeID: 2 }, 
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
                        setEditingObj({...editingObj, name: editingObj.name})
                    }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Mode:</p>
                <SelectionInput<string> value={editingObj.mode as string}
                    options={[]}
                    onChange={(e: string) => {}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Colour:</p>
                <SelectionInput<string> value={editingObj.color}
                    options={[]}
                    onChange={(e: string) => {}}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Stations:</p>
                <ArrayInput<Station> isOrdered={true} value={dummy} name="Route Stations List:"
                    onChange={(e: {[key:number]: Station}) => { setDummy(e); }}/>
            </div>
            <div style={FormEntry}>
                <p style={InputLabel}>Departures:</p>
                <ArrayInput<Station> value={dummy} name="Route Departures List:"
                    onChange={(e: {[key:number]: Station}) => { setDummy(e); }}/>
            </div>
        </div>
        <div style={FormButtons}>
            <a style={SubmitBtn}>Submit</a>
            <a style={ResetBtn}>Reset</a>
        </div>
    </div>
}

export default RouteInspectorView;

