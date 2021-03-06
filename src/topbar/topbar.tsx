import React from 'react';
import { AppState } from '../store';
import { showModal } from '../modalManager/actions';
import { ModalType } from '../modalManager/constants';
import { ActionMenus } from './components/actionMenus';
import { ToolbarComponent } from './components/toolbar';
import { ChangeStatus } from './components/changeStatus';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
    LogoContainer,
    ToolbarContainer,
    TopSectionContainer,
    WindowTitle,
    MenuAndChangeContainer,
    ActionMenuLayout,
    ChangeStatusLayout,
    TopSectionInnerContainer,
    Logo
} from './topbar.css';
import './project-name.hover.anim.css';

const TopBar: React.FunctionComponent = (props) => {
    const dispatch = useDispatch()
    const project = useSelector((state: AppState) => state.project, shallowEqual);
    const isCollapsed = useSelector((state: AppState) => state.layout.isTopbarCollapsed);
    
    return <div style={{ boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.1)', zIndex: 40, position: 'relative'}}>
        <div style={{
            ...TopSectionContainer, 
            ...(!isCollapsed && {height: '64px'}),
            ...(isCollapsed && {height: '28px'})
        }}>
            {
                isCollapsed? null: 
                <div style={LogoContainer}>
                    <div style={Logo}><FontAwesomeIcon icon={faRoad} /></div>
                </div>
            }
            <div style={TopSectionInnerContainer}>
                { isCollapsed? null:
                    <p onClick={() => dispatch(showModal({modalProps: {}, modalType: ModalType.RENAME_PROJECT_MODAL}))}
                        className="project-name-hover-anim" style={WindowTitle}>{project.name}</p> 
                }
                <div style={MenuAndChangeContainer}>
                    <div style={ActionMenuLayout}><ActionMenus /></div>
                    <div style={ChangeStatusLayout}>
                        <ChangeStatus isSaving={false} lastChangeTimestamp={project.lastEdited} />
                    </div>
                </div>
            </div>
        </div>
        <div style={ToolbarContainer}><ToolbarComponent /></div>
    </div>;
}

export default TopBar;