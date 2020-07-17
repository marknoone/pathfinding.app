import React from 'react';
import { ToolbarComponent } from './components/toolbar';
import { ActionMenus } from './components/actionMenus';
import { ChangeStatus } from './components/changeStatus';
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

const TopBar: React.FunctionComponent = (props) => {
    return <>
        <div style={TopSectionContainer}>
            <div style={LogoContainer}>
                <img style={Logo} src="https://via.placeholder.com/300.png" alt=""/>
            </div>
            <div style={TopSectionInnerContainer}>
                <p style={WindowTitle}>Pathfinding.app</p>
                <div style={MenuAndChangeContainer}>
                    <div style={ActionMenuLayout}><ActionMenus /></div>
                    <div style={ChangeStatusLayout}>
                        <ChangeStatus isSaving={false} lastChangeTimestamp={1594985729285} />
                    </div>
                </div>
            </div>
        </div>
        <div style={ToolbarContainer}><ToolbarComponent /></div>
    </>;
}

export default TopBar;