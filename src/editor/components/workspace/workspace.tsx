import React, { useState, useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { PathfindingCanvas } from './components/pathfindingCanvas';
import { ScenarioSelector } from './components/scenarioSelector';

const WorkspaceComponent: React.FunctionComponent<{isComponentCollapsed:boolean}> = (props) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState([500, 500]);    
    const effect = useMemo(() => () => {
        if(canvasContainerRef.current)
            setDimensions([
                canvasContainerRef.current.clientWidth,
                canvasContainerRef.current.clientHeight,
            ])
    }, [])

    useLayoutEffect(effect, []);
    useEffect(() => {
        window.addEventListener("resize", effect);
        return () => window.removeEventListener("resize", effect)
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
            right: 0,
            height: '38px',
            ...(props.isComponentCollapsed && {left: '12px'}),
            ...(!props.isComponentCollapsed && {left: '360px'}),
        }}><ScenarioSelector /></div> 
    </div>;
}


export default WorkspaceComponent;