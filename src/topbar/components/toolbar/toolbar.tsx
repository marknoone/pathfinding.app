import React from 'react';
import { useDispatch } from 'react-redux'
import { GetMenuSectionDefinitions } from './menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownMenu } from '../../../app/components/dropdownMenu';
import { DropdownMenuIconBtn } from '../../../app/components/dropdownMenu/components/iconBtn';
import { DropdownMenuTextBtn } from '../../../app/components/dropdownMenu/components/textBtn';
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
    const sectionDefintions = GetMenuSectionDefinitions(dispatch);

    return <div style={BaseStyle}>
        {/* Panel Selections */}
        <div style={ToolbarSection}>
            <DropdownMenu 
                render={ () => <DropdownMenuIconBtn icon={faColumns}/> } 
                isActive={false}
                onBtnClick={() => {}}
                sections={sectionDefintions["panels"]}/>
        </div>

        {/* Zoom Selection */}
        <div style={ToolbarSection}>
            <DropdownMenu 
                render={ () => <DropdownMenuTextBtn hasCaret={true} title="100%"/> } 
                isActive={false}
                onBtnClick={() => {}}
                sections={sectionDefintions["zoomSelection"]}/>
        </div>

        {/* Zoom Buttons */}
        <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faSearchPlus}/>
                    </a>
                </li>
                <li style={{...ToolbarBtnListElem}} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn} className="">
                        <FontAwesomeIcon icon={faSearchMinus}/>
                    </a>
                </li>
            </ul>
        </div>

        {/* Undo/Redo Buttons */}
        <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faUndo}/>
                    </a>
                </li>
                <li style={{...ToolbarBtnListElem}} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn} ><FontAwesomeIcon icon={faRedo}/></a>
                </li>
            </ul>
        </div>

        {/* Delete Button */}
        <div style={ToolbarSection}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </a>
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
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faStop}/>
                    </a>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faBus}/>
                    </a>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTrain}/>
                    </a>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={ToolbarBtn}>
                        <FontAwesomeIcon icon={faTram}/>
                    </a>
                </li>
            </ul>
        </div>

        {/* Window Interactions */}
        <div style={WindowInteractionButtons}>
            <ul style={ToolbarBtnList}>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={{...ToolbarBtn, color: '#444'}}>
                        <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                    </a>
                </li>
                <li style={ToolbarBtnListElem} className="toolbar-btn-hover">
                    <a onClick={()=>{}} style={{...ToolbarBtn, color: '#444'}}>
                        <FontAwesomeIcon icon={faAngleDoubleUp}/>
                    </a>
                </li>
            </ul>
        </div>
    </div>;
}

export default ToolbarComponent;