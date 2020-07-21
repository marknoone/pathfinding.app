import React from 'react';
import {
    BaseStyle,
    WorkspaceCanvas
} from './pathfindingCanvas.css';

const PathfindingCanvas: React.FunctionComponent = (props) => 
    <div style={BaseStyle}> 
        <canvas style={WorkspaceCanvas}></canvas>
    </div>;

export default PathfindingCanvas;