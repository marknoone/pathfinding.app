import React from 'react';
import { PathfindingCanvas } from './components/pathfindingCanvas';
import { ScenarioSelector } from './components/scenarioSelector';

const WorkspaceComponent: React.FunctionComponent = (props) => 
<div style={{position: "relative", height: '100%'}}> 
    <div style={{
        width: '100%', 
        height: '100%'
    }}><PathfindingCanvas /></div> 
    
    <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '38px',
    }}><ScenarioSelector /></div> 
</div>;

export default WorkspaceComponent;