import React, { useLayoutEffect } from 'react';
import { Stage } from "react-konva";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { KonvaBG } from './components/konvaBG';
import { KonvaGrid } from './components/konvaGrid';
import { KonvaComponentManager } from './components/konvaComponentManager';
import { KonvaVehicleManager } from './components/konvaVehicleManager';
import { UpdateStationByID } from '../../../leftPanel/components/componentView/actions';
import { AppState } from '../../../../../store';
import { 
    SetCanvasCoordinates,
    SetScaleAndCanvasScale
} from './actions';
import { SetInspectingObject } from '../../../rightPanel/components/inspectorView/actions';
import { ComponentTypes } from '../../../../constants';
import { KonvaPassengerManager } from './components/konvaPassengerManager';
import { UpdatePassengerWithID } from '../../../leftPanel/components/passengerView/actions';
import { Vector2d } from 'konva/types/types';

type PCProps = { dimensions: number[] }
type PCState = {coords: number[], scale: {x: number, y: number}}
const PathfindingCanvas: React.FunctionComponent<PCProps> = (props) => {
    const dispatch = useDispatch();
    const canvasOpts = useSelector((state: AppState) => state.canvas, shallowEqual);
    const inspecting = useSelector((state:AppState) => state.inspector, shallowEqual);
    const passengers = useSelector((state: AppState) => state.scenario.scenarios
        [ state.scenario.activeScenarioIdx ].passengers.tree, shallowEqual);
    const stations = useSelector((state: AppState) => state.scenario.scenarios
        [ state.scenario.activeScenarioIdx ].stations, shallowEqual);
    const routes = useSelector((state: AppState) => state.scenario.scenarios
        [ state.scenario.activeScenarioIdx ].routes, shallowEqual);
    const vehicles = useSelector((state: AppState) => state.scenario.scenarios
        [ state.scenario.activeScenarioIdx ].vehicles, shallowEqual);

    useLayoutEffect(() => {
        dispatch(SetCanvasCoordinates(
            props.dimensions[0]/2 - canvasOpts.canvasSize[0]/2,
            props.dimensions[1]/2 - canvasOpts.canvasSize[1]/2,
        ));
    }, [props.dimensions, canvasOpts.canvasSize]);

    return <Stage 
    width={props.dimensions[0]} 
    height={props.dimensions[1]}>
        <KonvaBG dimensions={props.dimensions} fill="#f1f3f4"/>
        <KonvaGrid coords={canvasOpts.coords} dimensions={canvasOpts.canvasSize} 
            scale={{x: canvasOpts.scale[0], y: canvasOpts.scale[1]}}
            blockSize={canvasOpts.boxSize} onCoordChange={(c) => dispatch(SetCanvasCoordinates(c[0], c[1])) }
            onScaleChange={(s) => dispatch(SetScaleAndCanvasScale(
                s.newCoords[0], s.newCoords[1], 
                s.newScale.x, s.newScale.y
            ))}/>
        <KonvaComponentManager gridBlockSize={canvasOpts.boxSize} inspecting={inspecting}
            coords={canvasOpts.coords} stations={stations.data} routes={routes.data} 
            scale={{x: canvasOpts.scale[0], y: canvasOpts.scale[1]}} dimensions={canvasOpts.canvasSize} 
            onRouteClick={(id: number) => dispatch(SetInspectingObject(ComponentTypes.ROUTE, id))}
            onStationClick={(id: number) => dispatch(SetInspectingObject(ComponentTypes.STATION, id))}
            onStationCoordChange={(id, chg) => { 
                dispatch(UpdateStationByID({ ...stations.data[id], coordinates:{ x: chg.x, y: chg.y }}))
            }}/>
        <KonvaPassengerManager passengers={passengers} inspecting={inspecting} coords={canvasOpts.coords}
            scale={{x: canvasOpts.scale[0], y: canvasOpts.scale[1]}} gridBlockSize={canvasOpts.boxSize}
            onPassengerClick={(id: number) => dispatch(SetInspectingObject(ComponentTypes.PASSENGER, id))}
            onPassengerChange={(p) => { dispatch(UpdatePassengerWithID({...p}))}} dimensions={canvasOpts.canvasSize} />
        <KonvaVehicleManager coords={canvasOpts.coords}  
            scale={{x: canvasOpts.scale[0], y: canvasOpts.scale[1]}}/>
    </Stage>;
}

export const CreateBoundingFunc = (coord: number[], dimens: number[]) => (pos: Vector2d) => {;
    var newX = pos.x > coord[0] ? pos.x : coord[0];
    newX = newX < dimens[0]+coord[0] ? newX : dimens[0] + coord[0];
    var newY = pos.y > coord[1] ? pos.y : coord[1];
    newY = newY < dimens[1] + coord[1] ? newY : dimens[1] + coord[1];

    return {
        x: newX,
        y: newY,
    };
}

export default PathfindingCanvas;

