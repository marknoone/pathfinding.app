import { ComponentTypes } from '../../../../constants';
import { 
    InspectorState, 
    InspectorAction,
    InspectorActionTypes
} from './constants';

export const SetInspectingObject = (type:ComponentTypes, id: number):InspectorAction => ({
    type: InspectorActionTypes.SET_INSPECTING_OBJECT,
    payload: {elementID: id, componentType: type}
})

