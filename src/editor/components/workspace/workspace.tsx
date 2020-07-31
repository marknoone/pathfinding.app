import React, { useState, useRef, useLayoutEffect } from 'react';
import { PathfindingCanvas } from './components/pathfindingCanvas';
import { ScenarioSelector } from './components/scenarioSelector';

const WorkspaceComponent: React.FunctionComponent = (props) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState([500, 500]);

    useLayoutEffect(() => {
        if(canvasContainerRef.current)
            setDimensions([
                canvasContainerRef.current.clientWidth,
                canvasContainerRef.current.clientHeight,
            ])
    }, [])

    return <div ref={canvasContainerRef}
        style={{position: "relative", height: '100%'}}> 
        <div style={{
            width: '100%', 
            height: 'calc(100% - 38px)'
        }}><PathfindingCanvas dimensions={dimensions}/></div> 
        
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '38px',
        }}><ScenarioSelector /></div> 
    </div>;
}


export default WorkspaceComponent;