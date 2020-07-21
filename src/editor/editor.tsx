import React from 'react';
import { ScenarioPanel } from './components/scenarioPanel';
import { WorkspaceComponent } from './components/workspace';
import { SimulationPanel } from './components/simulationPanel';
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
        }}><ScenarioPanel /></div>

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
        }}><SimulationPanel /></div>
    </div>;
}

export default EditorComponent;