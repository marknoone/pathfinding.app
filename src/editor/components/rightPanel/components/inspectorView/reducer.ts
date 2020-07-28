import { Reducer } from 'redux';
import { ComponentTypes } from '../../../../constants';
import { 
    InspectorState, 
    InspectorAction,
    InspectorActionTypes
} from './constants';

export const initialState = {
    elementID: 0,
    componentType: ComponentTypes.STATION,
}


const InspectorReducer: Reducer<InspectorState, InspectorAction> = (state = initialState, action) => {
    switch(action.type) {
        case InspectorActionTypes.SET_INSPECTING_OBJECT:
            return {
                elementID: action.payload.elementID,
                componentType: action.payload.componentType
            }
        default:
            return state;
    }
}

export default InspectorReducer;