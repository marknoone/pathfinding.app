import React from 'react';
import {
    BaseStyle,
    WorkspaceCanvas
} from './pathfindingCanvas.css';

const PathfindingCanvas: React.FunctionComponent = (props) => 
    <div style={BaseStyle}> 
        <div style={{}}>
            <canvas style={WorkspaceCanvas}></canvas>
        </div>
    </div>;

export default PathfindingCanvas;