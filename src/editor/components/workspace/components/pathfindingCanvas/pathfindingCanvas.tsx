import React, { useState } from 'react';
import { KonvaBG } from './components/konvaBG';
import { KonvaGrid } from './components/konvaGrid';
import { KonvaComponentManager } from './components/konvaComponentManager';
import { Stage, Layer } from "react-konva";


type PCProps={ dimensions: number[] }
const PathfindingCanvas: React.FunctionComponent<PCProps> = (props) => {
    const [coords, setCoords] = useState([50, 50]);

    return <Stage 
    width={props.dimensions[0]} 
    height={props.dimensions[1]}>
        <KonvaBG dimensions={props.dimensions} fill="#f1f3f4"/>
        <KonvaGrid coords={coords} dimensions={[400, 400]} 
            blockSize={30} onCoordChange={(n) => setCoords(n)}/>
        <KonvaComponentManager gridBlockSize={30} coords={coords} />
    </Stage>;
}

export default PathfindingCanvas;

