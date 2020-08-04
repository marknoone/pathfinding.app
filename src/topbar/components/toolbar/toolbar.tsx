import React from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { SetToolbarCollapse} from '../../../app/store/layout/actions';
import { GetMenuSectionDefinitions } from './menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownMenu } from '../../../app/components/dropdownMenu';
import { DropdownMenuIconBtn } from '../../../app/components/dropdownMenu/components/iconBtn';
import { DropdownMenuTextBtn } from '../../../app/components/dropdownMenu/components/textBtn';
import { SetToolbarLayoutSelectValue, SetToolbarZoomLevelValue } from '../../../app/store/layout/actions'; 
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


const ToolbarComponent: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const toolbarMenus = useSelector((state:AppState) => state.layout.toolbar, shallowEqual)
    const isCollapsed = useSelector((state: AppState) => state.layout.isTopbarCollapsed);
    const sectionDefintions = GetMenuSectionDefinitions(dispatch);

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
                render={ () => <DropdownMenuTextBtn hasCaret={true} title="100%"/> } 
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
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faSearchPlus}/>
                    </button>
                </li>
                <li style={{...ToolbarBtnListElem}} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn} className="">
                        <FontAwesomeIcon icon={faSearchMinus}/>
                    </button>
                </li>
            </ul>
        </div>

        {/* Undo/Redo Buttons */}
        <div style={ToolbarSection}>
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
        </div>

        {/* Delete Button */}
        <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </li>
            </ul>
        </div>
        
        {/* Add Element Button */}
        <div style={ToolbarSection}>
            <DropdownMenu 
                    render={ () => <DropdownMenuIconBtn icon={faPlus}/> } 
                    isActive={false}
                    onBtnClick={() => {}}
                    sections={sectionDefintions["zoomSelection"]}/>
        </div>

        {/* Brush Buttons */}
        <div style={ToolbarSection}>
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
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTrain}/>
                    </button>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTram}/>
                    </button>
                </li>
            </ul>
        </div>

        {/* Window Interactions */}
        <div style={WindowInteractionButtons}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <button onClick={()=>{}} style={{...ToolbarBtn, color: '#444'}}>
                        <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                    </button>
                </li>
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