import { 
    Passenger,
    PassengerDirectory,
    PassengerActionTypes, 
    PassengerAction 
} from './constants';

export const UpdatePassengerWithID = (val: Passenger):PassengerAction => ({
    type: PassengerActionTypes.UPDATE_PASSENGER_WITH_ID,
    payload: {id: val.id, item: val}
})

export const UpdateDirectoryWithID = (val: PassengerDirectory):PassengerAction => ({
        type: PassengerActionTypes.UPDATE_DIRECTORY_WITH_ID,
        payload: {id: val.id, item: val}
})

export const AddPassengerToDirectory = (targetID: number, val: Passenger):PassengerAction => ({
    type: PassengerActionTypes.ADD_PASSENGER_TO_DIRECTORY,
    payload: {id: targetID, item: val}
})

export const AddEmptyPassengerToDirectory = (dirID: number):PassengerAction => ({
    type: PassengerActionTypes.ADD_EMPTY_PASSENGER_TO_DIRECTORY,
    payload: {id: dirID}
})

export const AddEmptyDirectoryToDirectory = (dirID: number):PassengerAction => ({
    type: PassengerActionTypes.ADD_EMPTY_DIRECTORY_TO_DIRECTORY,
    payload: {id: dirID}
})

export const AddDirectoryToDirectory = (targetID: number,val: PassengerDirectory):PassengerAction => ({
    type: PassengerActionTypes.ADD_DIRECTORY_TO_DIRECTORY,
    payload: {id: targetID, item: val}
})

export const DeletePassenger = (id: number):PassengerAction => ({
    type: PassengerActionTypes.DELETE_PASSENGER_FROM_SCENARIO,
    payload: {id: id}
})

export const DeletePassengerDirectory = (id: number):PassengerAction => ({
    type: PassengerActionTypes.DELETE_DIRECTORY_FROM_SCENARIO,
    payload: {id: id}
})

export const SetPassengerLock = (id: number, val:boolean):PassengerAction => ({
    type: PassengerActionTypes.SET_PASSENGER_LOCK_BY_ID,
    payload: {id: id, lock: val}
})