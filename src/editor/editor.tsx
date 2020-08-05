import React from 'react';
import { LeftPanel } from './components/leftPanel';
import { WorkspaceComponent } from './components/workspace';
import { RightPanel } from './components/rightPanel';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

const EditorComponent: React.FunctionComponent = (props) => {
    const isComponentCollapsed = useSelector((s:AppState) => s.layout.isComponentPanelCollapsed);
    const isSimCollapsed = useSelector((s:AppState) => s.layout.isSimulationPanelCollapsed);
    const width = () => {

    }

    return <div style={{
        height: 'calc(100vh - 96px)',
        position: 'relative'
    }}>
        <div style={{
            height: '100%',
            display: 'inline-block',
            position: 'absolute',
            bottom: 0,
            left: 0,
            verticalAlign: 'top',
            ...(isComponentCollapsed && {width: '12px'}), 
            ...(!isComponentCollapsed && {width: '360px'}), 
        }}><LeftPanel isCollapsed={isComponentCollapsed}/></div>

        <div style={{
            display: 'inline-block',
            verticalAlign: 'top',
            width: 'calc(100vw)',
            height: '100%',
        }}><WorkspaceComponent isComponentCollapsed={isComponentCollapsed}/></div>

        <div style={{ 
            height: '100%',
            display: 'inline-block',
            position: 'absolute',
            bottom: 0,
            right: 0,
            verticalAlign: 'top',
            float: 'right',
            ...(isSimCollapsed && {width: '12px'}), 
            ...(!isSimCollapsed && {width: '360px'}), 
        }}><RightPanel isCollapsed={isSimCollapsed}/></div>
    </div>;
}

export default EditorComponent;