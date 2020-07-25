import { Reducer } from 'redux';
import { PassengerState, PassengerAction, PassengerActionTypes } from './constants'

const initialState: PassengerState = {
    nextId: 1,
    tree: {
        0 : {
            id: 0,
            name: "All Passenger Trips",
            children: [],
            isCollapsed: false,
        }
    }
}

const PassengerReducer: Reducer<PassengerState, PassengerAction> = (state = initialState, action) => {
    switch(action.type) {
        case PassengerActionTypes.UPDATE_PASSENGER_WITH_ID:
            return {
                ...state
            }
        case PassengerActionTypes.ADD_PASSENGER_TO_DIRECTORY:
            return {
                ...state
            }
        case PassengerActionTypes.DELETE_PASSENGER_FROM_SCENARIO:
            return {
                ...state
            }
        case PassengerActionTypes.UPDATE_DIRECTORY_WITH_ID:
            return {
                ...state
            }
        case PassengerActionTypes.ADD_DIRECTORY_TO_DIRECTORY:
            return {
                ...state
            }
        case PassengerActionTypes.DELETE_DIRECTORY_FROM_SCENARIO:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default PassengerReducer;