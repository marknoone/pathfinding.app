import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoutes, getStations, getVehicles } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseStyle, CategoryEntry, CollapseIcon, CategoryName, AddIcon, CategoryChildren,
    CCChild } from './componentView.css';
import { SetInspectingObject } from '../../../rightPanel/components/inspectorView/actions';
import { ComponentTypes } from '../../../../constants';
import { 
    AddEmptyStationComponent,
    AddEmptyRouteComponent,
    AddEmptyVehicleComponent,
} from './actions';
import { AppState } from '../../../../../store';

type CCElem = {id: number, name: string}
type CCElemDataObj = { [key:number] :CCElem }
type CCProps = { 
    category:string,  
    activeItem: number,
    items: CCElemDataObj

    addItem: () => void,
    onItemClick?: (id: number) => void, 
}

const ComponentCategoryView: React.FunctionComponent<CCProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return <><div style={CategoryEntry}>
            <div style={CollapseIcon} onClick={() => {setIsCollapsed(!isCollapsed)}}>
                <FontAwesomeIcon icon={isCollapsed? faCaretRight:faCaretDown}/></div>
            <p style={CategoryName}>{props.category}</p>
            <div style={AddIcon} onClick={() => {props.addItem()}}>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
        </div>
        {
            !isCollapsed? 
            <div style={CategoryChildren}>
                {
                    Object.keys(props.items).map((k:any, i:number) => {
                        const elem = props.items[k]
                        return <div style={{
                            ...CCChild,
                            ...(i+1 === props.activeItem && { backgroundColor: '#e8e8e8' })
                        }} 
                        onClick={() => {
                            if(props.onItemClick)
                                props.onItemClick(elem.id)
                        }}> 
                        {elem.name} </div>
                    })
                }
            </div>
            :null 
        }
    </>;
}

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
            activeItem={activeInspection.componentType === ComponentTypes.STATION? activeInspection.elementID: -1}/>
        <ComponentCategoryView category="Routes" items={routes}
            addItem={() => { dispatch(AddEmptyRouteComponent()) }}
            onItemClick={(id: number) => { dispatch(SetInspectingObject(ComponentTypes.ROUTE, id)) }}
            activeItem={activeInspection.componentType === ComponentTypes.ROUTE? activeInspection.elementID: -1}/>
        <ComponentCategoryView category="Vehicles" items={vehicles}
            addItem={() => { dispatch(AddEmptyVehicleComponent()) }}
            onItemClick={(id: number) => { dispatch(SetInspectingObject(ComponentTypes.VEHICLE, id)) }}
            activeItem={activeInspection.componentType === ComponentTypes.VEHICLE? activeInspection.elementID: -1}/>
    </div>;
}

export default ComponentView;