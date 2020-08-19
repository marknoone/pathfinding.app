import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import React, { useMemo, useState } from 'react';
import { AppState } from '../../../../../store';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import PassengerDirectoryElement from './passengerDirElem';
import { PassengerDirectory, Passenger } from './constants';
import { makeGetPassengerElemByIDSelector, getPassengerTree } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentTypes } from '../../../../constants';
import { SetInspectingObject } from '../../../rightPanel/components/inspectorView/actions';
import {
    PassengerElementStyle,
    PassengerIcon,
    PassengerP,
    HoverIcon
} from './passengerView.css';
import { SetPassengerLock } from './actions';

const PassengerView: React.FunctionComponent = (props) => {
    const getPassengerElemByID = useMemo(makeGetPassengerElemByIDSelector, [])
    const dir = useSelector((state: AppState) => 
        getPassengerElemByID(state, 0)) as PassengerDirectory

    return <PassengerDirectoryElement key={0} dir={dir}/>;
}

type PProps = { passenger: Passenger }
export const PassengerElement: React.FunctionComponent<PProps> = (props) => {
    const dispatch = useDispatch();
    const [isHovering, setIsHovering] = useState(false);
    const isActive = useSelector((state:AppState) => 
        state.inspector.componentType === ComponentTypes.PASSENGER 
        && state.inspector.elementID === props.passenger.id
    );


    return <div style={{
        ...PassengerElementStyle,
        ...(isActive && { backgroundColor: "#e8e8e8"})
    }} 
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    onClick={() => dispatch(
        SetInspectingObject(ComponentTypes.PASSENGER, props.passenger.id)
    )}>
        <div style={PassengerIcon}><FontAwesomeIcon icon={faUser}/></div>
        <p style={PassengerP}>{props.passenger.name}</p>
        {
            ( isHovering || props.passenger.isLocked) ? 
            <div style={{
                ...HoverIcon, fontSize: '14px',}}>
                <span style={{ 
                    cursor: 'pointer',
                    color: props.passenger.isLocked?'#464646': 'rgb(153, 153, 153)'
                }} onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                    event.preventDefault();
                    dispatch(SetPassengerLock(props.passenger.id, !props.passenger.isLocked))
                }}>
                    <FontAwesomeIcon icon={faLock}/></span>
            </div>
            :null
        }
    </div>;
}
    


export default PassengerView;