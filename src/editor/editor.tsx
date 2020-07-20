import React from 'react';
import { ScenarioPanel } from './components/scenarioPanel';
import { WorkspaceComponent } from './components/workspace';
import { SimulationPanel } from './components/simulationPanel';
import {
    BaseStyle
} from './editor.css';

const EditorComponent: React.FunctionComponent = (props) => {
    return <>
        <ScenarioPanel />
        <WorkspaceComponent />
        <SimulationPanel />
    </>;
}

export default EditorComponent;