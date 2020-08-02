import React, { useLayoutEffect } from 'react';
import { Stage } from "react-konva";
import { useSelector, useDispatch } from 'react-redux';
import { KonvaBG } from './components/konvaBG';
import { KonvaGrid } from './components/konvaGrid';
import { KonvaComponentManager } from './components/konvaComponentManager';
import { KonvaVehicleManager } from './components/konvaVehicleManager';
import { AppState } from '../../../../../store';
import { 
    SetCanvasCoordinates,
    SetScaleAndCanvasScale
} from './actions';

type PCState = {coords: number[], scale: {x: number, y: number}}
type PCProps={ dimensions: number[] }
const PathfindingCanvas: React.FunctionComponent<PCProps> = (props) => {
    const dispatch = useDispatch();
    const scale = useSelector((state: AppState) => state.canvas.scale);
    const boxSize = useSelector((state: AppState) => state.canvas.boxSize);
    const coords = useSelector((state: AppState) => state.canvas.coords);
    const dimens = useSelector((state: AppState) => state.canvas.canvasSize);

    useLayoutEffect(() => {
        dispatch(SetCanvasCoordinates(
            props.dimensions[0]/2 - dimens[0]/2,
            props.dimensions[1]/2 - dimens[1]/2,
        ));
    }, [props.dimensions]);

    return <Stage 
    width={props.dimensions[0]} 
    height={props.dimensions[1]}>
        <KonvaBG dimensions={props.dimensions} fill="#f1f3f4"/>
        <KonvaGrid coords={coords} dimensions={dimens} scale={{x: scale[0], y: scale[1]}}
            blockSize={boxSize} onCoordChange={(c) => SetCanvasCoordinates(c[0], c[1]) }
            onScaleChange={(s) => SetScaleAndCanvasScale(
                s.newCoords[0], s.newCoords[1], 
                s.newScale.x, s.newScale.y
            )}/>
        <KonvaComponentManager gridBlockSize={boxSize} coords={coords} 
            scale={{x: scale[0], y: scale[1]}}/>
        <KonvaVehicleManager coords={coords}  scale={{x: scale[0], y: scale[1]}}/>
    </Stage>;
}

export default PathfindingCanvas;

