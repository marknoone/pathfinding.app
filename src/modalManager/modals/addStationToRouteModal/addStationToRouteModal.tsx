import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeGetRouteByIDSelector, getStations } from '../../../editor/components/leftPanel/components/componentView/selectors';
import { UpdateRouteByID } from '../../../editor/components/leftPanel/components/componentView/actions';
import { SelectionInput } from '../../../app/components/selectionInput';
import { AppState } from '../../../store';
import Modal from '../modal';
import CSS from 'csstype';
import { Station, StationSelection } from '../../../editor/components/leftPanel/components/componentView/constants';

const Label: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px',
}

const MsgStyle: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    color: '#464646',
};

const Input: CSS.Properties = {
    borderRadius: '6px',
    border: '1px solid #ddd',
    padding: '5px 5px',
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    width: '120px',
    marginLeft: '24px',
    outline: 0
}

type ASTRMProps = { routeID: number; }
const AddStationToRouteModal: React.FunctionComponent<ASTRMProps> = ({ routeID }) => {
    const dispatch = useDispatch();
    const getRouteByID = useMemo(makeGetRouteByIDSelector, [])
    const route = useSelector((state: AppState) =>  getRouteByID(state, routeID))
    const stations = useSelector((state:AppState) => getStations(state))
    const options = Object.keys(stations).map((key) => ({ s: stations[+key].name, value: stations[+key] }))
    const [s, setS] = useState<StationSelection>({name: "", id: -1});

    var nextIdx = 1;
    if(route.stations && Object.keys(route.stations).length > 0){
        const max = Object.keys(route.stations).reduce((a, b) => { return Math.max(+a, +b).toString()});
        const id = parseInt(max, 10);
        if(!isNaN(id)) nextIdx = id+1;
    }

    return <Modal title={"Add Station To Route"} size={{w: '460px', h: '260px'}}
        primaryAction={{
            name: "Add",
            func: () =>  {
                if(s === undefined || s === null) return;
                if(s.id < 0) return;
                dispatch(UpdateRouteByID({...route, stations: { 
                    ...route.stations, 
                    [nextIdx]: { 
                        id: s.id, 
                        name: s.name
                    }
                }}))
            }
        }}  
        render={() =>{
            return s? <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Add a new station for this route.</p>
                <div>
                    <p style={{...Label, display: 'inline-block', width: '75px'}}>Stations:</p>
                    <SelectionInput<StationSelection> value={s}
                        options={options}
                        onChange={(e: StationSelection) => { setS(e) }}/>
                </div>
            </div>
            : <div>Please create a station before using this menu.</div>
        }}/>;
}
    
export default AddStationToRouteModal;