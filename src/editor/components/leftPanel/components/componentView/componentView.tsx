import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoutes, getStations, getVehicles } from './selectors';
import { BaseStyle } from './componentView.css';
import { SetInspectingObject } from '../../../rightPanel/components/inspectorView/actions';
import { ComponentTypes } from '../../../../constants';
import ComponentCategoryView, {CCElemDataObj} from './componentCategoryView';
import { 
    AddEmptyStationComponent,
    AddEmptyRouteComponent,
    AddEmptyVehicleComponent,
    SetVehicleLock,
    SetStationLock,
    SetRouteLock,
} from './actions';
import { AppState } from '../../../../../store';



const ComponentView: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const routes = useSelector(getRoutes) as CCElemDataObj;
    const stations = useSelector(getStations)  as CCElemDataObj;
    const vehicles = useSelector(getVehicles)  as CCElemDataObj;
    const activeInspection = useSelector((state:AppState) => state.inspector)

    return <div style={BaseStyle}>
        <ComponentCategoryView category="Stations" items={stations}
            addItem={() => { dispatch(AddEmptyStationComponent()) }} 
            onItemClick={(id: number) => { dispatch(SetInspectingObject(ComponentTypes.STATION, id)) }}
            onItemLock={(id: number) => { dispatch(SetStationLock(id, !stations[id].isLocked)) }}
            activeItem={activeInspection.componentType === ComponentTypes.STATION? activeInspection.elementID: -1}/>
        <ComponentCategoryView category="Routes" items={routes}
            addItem={() => { dispatch(AddEmptyRouteComponent()) }}
            onItemClick={(id: number) => { dispatch(SetInspectingObject(ComponentTypes.ROUTE, id)) }}
            onItemLock={(id: number) => { dispatch(SetRouteLock(id, !routes[id].isLocked)) }}
            activeItem={activeInspection.componentType === ComponentTypes.ROUTE? activeInspection.elementID: -1}/>
        <ComponentCategoryView category="Vehicles" items={vehicles}
            addItem={() => { dispatch(AddEmptyVehicleComponent()) }}
            onItemClick={(id: number) => { dispatch(SetInspectingObject(ComponentTypes.VEHICLE, id)) }}
            onItemLock={(id: number) => { dispatch(SetVehicleLock(id, !vehicles[id].isLocked)) }}
            activeItem={activeInspection.componentType === ComponentTypes.VEHICLE? activeInspection.elementID: -1}/>
    </div>;
}

export default ComponentView;