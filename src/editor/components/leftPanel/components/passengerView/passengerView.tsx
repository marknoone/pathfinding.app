import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import PassengerDirectoryElement from './passengerDirElem';
import { makeGetPassengerElemByIDSelector } from './selectors';
import { PassengerDirectory, Passenger } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../../../../store';
import {
    BaseStyle,
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
export const PassengerElement: React.FunctionComponent<PProps> = (props) => 
    <div style={PassengerElementStyle}>
        <div style={PassengerIcon}><FontAwesomeIcon icon={faUser} /></div>
        <p style={PassengerP}>{props.passenger.name}</p>
    </div>


export default PassengerView;