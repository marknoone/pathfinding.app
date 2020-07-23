import React from 'react';
import { LeftPanel } from './components/leftPanel';
import { WorkspaceComponent } from './components/workspace';
import { RightPanel } from './components/rightPanel';
import {
    BaseStyle
} from './editor.css';

const EditorComponent: React.FunctionComponent = (props) => {
    return <div style={{
        height: 'calc(100vh - 96px)',
    }}>
        <div style={{
            width: '360px', 
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
        }}><LeftPanel /></div>

        <div style={{
            display: 'inline-block',
            verticalAlign: 'top',
            width: 'calc(100vw - 720px)',
            height: '100%',
        }}><WorkspaceComponent /></div>

        <div style={{
            width: '360px', 
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
            float: 'right'
        }}><RightPanel /></div>
    </div>;
}

export default EditorComponent;