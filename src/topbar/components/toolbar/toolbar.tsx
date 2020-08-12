import React from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { SetToolbarCollapse} from '../../../app/store/layout/actions';
import { GetMenuSectionDefinitions } from './menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownMenu } from '../../../app/components/dropdownMenu';
import { AddInfoToastNotification } from '../../../toastManager/actions';
import { DropdownMenuIconBtn } from '../../../app/components/dropdownMenu/components/iconBtn';
import { DropdownMenuTextBtn } from '../../../app/components/dropdownMenu/components/textBtn';
import { 
    SetToolbarLayoutSelectValue, 
    SetToolbarZoomLevelValue,
    SetToolbarAddComponentValue,
} from '../../../app/store/layout/actions'; 
import { 
    faPlus, 
    faUndo, 
    faRedo, 
    faTrash, 
    faColumns, 
    faSearchPlus, 
    faSearchMinus,
    faStop,
    faBus,
    faTrain,
    faTram,
    faExpandArrowsAlt,
    faAngleDoubleUp,
    faAngleDoubleDown, 
} from '@fortawesome/free-solid-svg-icons';
import {
    BaseStyle,
    ToolbarBtn,
    ToolbarSection,
    ToolbarBtnList,
    ToolbarBtnListElem,
    WindowInteractionButtons
} from './toolbar.css';
import './toolbar.hover.anim.css';
import { SetCanvasScale } from '../../../editor/components/workspace/components/pathfindingCanvas/actions';
import { ComponentTypes } from '../../../editor/constants';
import { DeletePassenger } from '../../../editor/components/leftPanel/components/passengerView/actions';
import { DeleteStationWithID, DeleteRouteWithID, DeleteVehicleWithID } from '../../../editor/components/leftPanel/components/componentView/actions';


const ToolbarComponent: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const inspector = useSelector((s:AppState) => s.inspector);
    const currentScale = useSelector((s:AppState) => s.canvas.scale[0]);
    const toolbarMenus = useSelector((state:AppState) => state.layout.toolbar, shallowEqual)
    const isCollapsed = useSelector((state: AppState) => state.layout.isTopbarCollapsed);
    const layoutVals = useSelector((s:AppState) => {
        return {
            lp: s.layout.isComponentPanelCollapsed,
            rp: s.layout.isSimulationPanelCollapsed
        }
    });

    const sectionDefintions = GetMenuSectionDefinitions(dispatch, layoutVals);
    const getZoom = (scale:number) => Math.round(scale*100) + "%";

    return <div style={BaseStyle}>
        {/* Panel Selections */}
        <div style={ToolbarSection}>
            <DropdownMenu 
                render={ () => <DropdownMenuIconBtn icon={faColumns}/> } 
                isActive={toolbarMenus.isLayoutSelectShowing}
                onBtnClick={() => {
                    dispatch(SetToolbarLayoutSelectValue(!toolbarMenus.isLayoutSelectShowing));
                }}
                sections={sectionDefintions["panels"]}/>
        </div>

        {/* Zoom Selection */}
        <div style={ToolbarSection}>
            <DropdownMenu 
                render={ () => <DropdownMenuTextBtn hasCaret={true} title={getZoom(currentScale)}/> } 
                isActive={toolbarMenus.isZoomLevelShowing}
                onBtnClick={() => {
                    dispatch(SetToolbarZoomLevelValue(!toolbarMenus.isZoomLevelShowing));
                }}
                sections={sectionDefintions["zoomSelection"]}/>
        </div>

        {/* Zoom Buttons */}
        <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=> dispatch(SetCanvasScale(currentScale+0.1, currentScale+0.1))} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faSearchPlus}/>
                    </button>
                </li>
                <li style={{...ToolbarBtnListElem}} className="toolbar-btn-hover">
                    <button onClick={()=> dispatch(SetCanvasScale(currentScale-0.1, currentScale-0.1))} style={ToolbarBtn} className="">
                        <FontAwesomeIcon icon={faSearchMinus}/>
                    </button>
                </li>
            </ul>
        </div>

        {/* Undo/Redo Buttons */}
        {/* <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faUndo}/>
                    </button>
                </li>
                <li style={{...ToolbarBtnListElem}} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn} ><FontAwesomeIcon icon={faRedo}/></button>
                </li>
            </ul>
        </div> */}

        {/* Add Element Button */}
        <div style={ToolbarSection}>
            <DropdownMenu 
                    render={ () => <DropdownMenuIconBtn icon={faPlus}/> } 
                    isActive={toolbarMenus.isAddComponentShowing}
                    onBtnClick={() => {
                        dispatch(SetToolbarAddComponentValue(!toolbarMenus.isAddComponentShowing));
                    }}
                    sections={sectionDefintions["addElement"]}/>
        </div>

        {/* Delete Button */}
        <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=> {
                        if(!inspector.active) return;
                        switch(inspector.componentType){
                            case ComponentTypes.PASSENGER:
                                dispatch(DeletePassenger(inspector.elementID)); break;
                            case ComponentTypes.STATION:
                                dispatch(DeleteStationWithID(inspector.elementID)); break;
                            case ComponentTypes.ROUTE:
                                dispatch(DeleteRouteWithID(inspector.elementID)); break;
                            case ComponentTypes.VEHICLE:
                                dispatch(DeleteVehicleWithID(inspector.elementID)); break;
                            default: 
                                return;
                        }
                    }} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </li>
            </ul>
        </div>

        {/* Toggle Buttons */}
        {/* <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faStop}/>
                    </button>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faBus}/>
                    </button>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{ dispatch(AddInfoToastNotification("Test!"))}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTrain}/>
                    </button>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTram}/>
                    </button>
                </li>
            </ul>
        </div> */}

        {/* Window Interactions */}
        <div style={WindowInteractionButtons}>
            <ul style={ToolbarBtnList}>
                {/* <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={{...ToolbarBtn, color: '#444'}}>
                        <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                    </button>
                </li> */}
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{
                        dispatch(SetToolbarCollapse(!isCollapsed))
                    }} style={{...ToolbarBtn, color: '#444'}}>
                        <FontAwesomeIcon icon={isCollapsed?faAngleDoubleDown:faAngleDoubleUp}/>
                    </button>
                </li>
            </ul>
        </div>
    </div>;
}

export default ToolbarComponent;