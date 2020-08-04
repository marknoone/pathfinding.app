import { useSelector, useDispatch } from 'react-redux';
import React, { useMemo } from 'react';
import { AppState } from '../../../../../store';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PassengerDirectoryElement from './passengerDirElem';
import { PassengerDirectory, Passenger } from './constants';
import { makeGetPassengerElemByIDSelector } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentTypes } from '../../../../constants';
import { SetInspectingObject } from '../../../rightPanel/components/inspectorView/actions';
import {
    PassengerElementStyle,
    PassengerIcon,
    PassengerP
} from './passengerView.css';

const PassengerView: React.FunctionComponent = (props) => {
    const getPassengerElemByID = useMemo(makeGetPassengerElemByIDSelector, [])
    const dir = useSelector((state: AppState) => 
        getPassengerElemByID(state, 0)) as PassengerDirectory

    return <PassengerDirectoryElement key={0} dir={dir}/>;
}

type PProps = { passenger: Passenger }
export const PassengerElement: React.FunctionComponent<PProps> = (props) => {
    const dispatch = useDispatch();
    const isActive = useSelector((state:AppState) => 
        state.inspector.componentType === ComponentTypes.PASSENGER 
        && state.inspector.elementID === props.passenger.id
    );

    return <div style={{
        ...PassengerElementStyle,
        ...(isActive && { backgroundColor: "#e8e8e8"})
    }} 
    onClick={() => dispatch(
        SetInspectingObject(ComponentTypes.PASSENGER, props.passenger.id)
    )}>
        <div style={PassengerIcon}><FontAwesomeIcon icon={faUser} /></div>
        <p style={PassengerP}>{props.passenger.name}</p>
    </div>;
}
    


export default PassengerView;