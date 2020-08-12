import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store';
import Modal from '../modal';
import CSS from 'csstype';
import { UpdateRouteByID } from '../../../editor/components/leftPanel/components/componentView/actions';
import { makeGetRouteByIDSelector } from '../../../editor/components/leftPanel/components/componentView/selectors';

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

type ADTRMProps = { routeID: number; }
const AddDepartureToRouteModal: React.FunctionComponent<ADTRMProps> = ({ routeID }) => {
    const dispatch = useDispatch();
    const getRouteByID = useMemo(makeGetRouteByIDSelector, [])
    const route = useSelector((state: AppState) =>  getRouteByID(state, routeID))
    const [time, setTime] = useState<{s:number, m:number, h:number,}>({s: 0, m: 0, h: 0});

    var nextIdx = 1;
    if(route.departures && Object.keys(route.departures).length > 0){
        const max = Object.keys(route.departures).reduce((a, b) => { return Math.max(+a, +b).toString()});
        const id = parseInt(max, 10);
        if(!isNaN(id)) nextIdx = id+1;
    }

    return <Modal title={"Add Departure To Route"} size={{w: '460px', h: '360px'}}
        primaryAction={{
            name: "Add",
            func: () => {
                const date = new Date(0);
                date.setUTCHours(time.h);
                date.setUTCMinutes(time.m);
                date.setUTCSeconds(time.s);
                dispatch(UpdateRouteByID({...route, departures:{
                    ...route.departures, 
                    [nextIdx]: {name: date.toUTCString().split(" ")[4], value: date.getTime()/1000} 
                }}))
            }
        }}  
        render={() =>{
            return <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Enter a new departure time for this route.</p>
                <p style={Label}>Route Time:</p>
                <div>
                    <p style={{...Label, display: 'inline-block', width: '75px'}}>Hours:</p>
                    <input style={Input} type="text" value={time.h}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = parseInt(e.target.value, 10);
                            if(!isNaN(val)) return setTime({...time, h: val})
                        }} />
                </div>
                <div>
                    <p style={{...Label, display: 'inline-block', width: '75px'}}>Minutes:</p>
                    <input style={Input} type="text" value={time.m}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = parseInt(e.target.value, 10);
                            if(!isNaN(val)) return setTime({...time, m: val})
                        }} />
                </div>
                <div>
                    <p style={{...Label, display: 'inline-block', width: '75px'}}>Seconds:</p>
                    <input style={Input} type="text" value={time.s}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = parseInt(e.target.value, 10);
                            if(!isNaN(val)) return setTime({...time, s: val})
                        }} />
                </div>
            </div>;
        }}/>;
}
     
    
export default AddDepartureToRouteModal;