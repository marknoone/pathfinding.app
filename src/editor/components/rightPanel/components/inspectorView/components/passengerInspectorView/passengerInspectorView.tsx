import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { AppState } from '../../../../../../../store';
import { InspectorSubViewProps } from '../../inspectorView'
import { Passenger } from '../../../../../leftPanel/components/passengerView/constants';
import { isPassenger } from '../../../../../leftPanel/components/passengerView/constants';
import { makeGetPassengerElemByIDSelector } from '../../../../../leftPanel/components/passengerView/selectors';


const PassengerInspectorView: React.FunctionComponent<InspectorSubViewProps> = (props) => {
    const [editingObj, setEditingObj] = useState<Passenger>()
    const getPassengerElemByID = useMemo(makeGetPassengerElemByIDSelector, [])
    const passenger = useSelector((state: AppState) =>  getPassengerElemByID(state, props.id))
    if(!isPassenger(passenger)){ 
        console.error("Passenger directory not supported in passenger inspector view."); 
        return <></> 
    } 

    setEditingObj(passenger);
    return <></>
}

export default PassengerInspectorView;