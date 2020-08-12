import { Reducer } from 'redux';
import { ComponentTypes } from '../../../../constants';
import { 
    InspectorState, 
    InspectorAction,
    InspectorActionTypes
} from './constants';

export const initialState = {
    active: false,
    elementID: 1,
    componentType: ComponentTypes.STATION,
}


const InspectorReducer: Reducer<InspectorState, InspectorAction> = (state = initialState, action) => {
    switch(action.type) {
        case InspectorActionTypes.SET_INSPECTING_OBJECT:
            if(!action.payload.elementID) return state;
            if(!action.payload.componentType) return state;
            return {
                active: true,
                elementID: action.payload.elementID,
                componentType: action.payload.componentType
            };
        case InspectorActionTypes.SET_INSPECTOR_IS_ACTIVE:
            return (action.payload.isActive !== undefined 
                && action.payload.isActive !== null)? {
                ...state,
                active: action.payload.isActive
            }: state;
        default:
            return state;
    }
}

export default InspectorReducer;