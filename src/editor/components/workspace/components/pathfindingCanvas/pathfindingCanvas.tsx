import React, { useState, useLayoutEffect } from 'react';
import { KonvaBG } from './components/konvaBG';
import { KonvaGrid } from './components/konvaGrid';
import { KonvaComponentManager } from './components/konvaComponentManager';
import { KonvaVehicleManager } from './components/konvaVehicleManager';
import { Stage, Layer, Rect } from "react-konva";

type PCState = {coords: number[], scale: {x: number, y: number}}
type PCProps={ dimensions: number[] }
const PathfindingCanvas: React.FunctionComponent<PCProps> = (props) => {
    const gridDimensions = [800, 800]
    const [state, setState] = useState<PCState>({
        coords: [250, 250],
        scale: {x:1, y:1}
    });

    useLayoutEffect(() => {
        setState({
            ...state,
            coords: [
            props.dimensions[0]/2 - gridDimensions[0]/2,
            props.dimensions[1]/2 - gridDimensions[1]/2,
        ]})
    }, [props.dimensions]);

    return <Stage 
    width={props.dimensions[0]} 
    height={props.dimensions[1]}>
        <KonvaBG dimensions={props.dimensions} fill="#f1f3f4"/>
        <KonvaGrid coords={state.coords} dimensions={gridDimensions} scale={state.scale}
            blockSize={30} onCoordChange={(c) => setState({ ...state, coords: c })}
            onScaleChange={(s) => setState({scale: s.newScale, coords: s.newCoords})}/>
        <KonvaComponentManager gridBlockSize={30} coords={state.coords} 
            scale={state.scale}/>
        <KonvaVehicleManager coords={state.coords}  scale={state.scale}/>
    </Stage>;
}

export default PathfindingCanvas;

