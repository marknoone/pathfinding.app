import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoutes, getStations, getVehicles } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseStyle, CategoryEntry, CollapseIcon, CategoryName, AddIcon, CategoryChildren,
    CCChild } from './componentView.css';
import { 
    AddEmptyStationComponent,
    AddEmptyRouteComponent,
    AddEmptyVehicleComponent,
} from './actions';

type CCElem = {id: number, name: string}
type CCElemDataObj = { [key:number] :CCElem }
type CCProps = { 
    category:string,  
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
                    Object.keys(props.items).map((k:any) => {
                        const elem = props.items[k]
                        return <div style={CCChild} 
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

    return <div style={BaseStyle}>
        <ComponentCategoryView category="Stations" items={stations}
            addItem={() => { dispatch(AddEmptyStationComponent()) }}/>
        <ComponentCategoryView category="Routes" items={routes}
            addItem={() => { dispatch(AddEmptyRouteComponent()) }}/>
        <ComponentCategoryView category="Vehicles" items={vehicles}
            addItem={() => { dispatch(AddEmptyVehicleComponent()) }}/>
    </div>;
}

export default ComponentView;