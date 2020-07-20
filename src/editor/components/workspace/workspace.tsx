import React from 'react';
import {
    BaseStyle,
    WorkspaceCanvas
} from './workspace.css';

const WorkspaceComponent: React.FunctionComponent = (props) => <div style={BaseStyle}> 
    <canvas style={WorkspaceCanvas}/> 
</div>;

export default WorkspaceComponent;