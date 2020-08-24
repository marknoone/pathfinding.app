import React, { useState } from 'react';
import { Layer, Circle } from "react-konva";
import { ComponentTypes } from '../../../../../../constants';
import { CreateBoundingFunc } from '../../pathfindingCanvas';  
import { KonvaPassengerPath } from './components/konvaPassengerPath';
import { KonvaPassengerPoint } from './components/konvaPassengerPoint';
import { PassengerPath, PassengerSimData } from '../../../../../../../app/pkg/simulation';
import { svgPathData as flagSVG } from '@fortawesome/free-solid-svg-icons/faFlag';
import { InspectorState } from '../../../../../rightPanel/components/inspectorView/constants';
import { svgPathData as crosshairSVG } from '@fortawesome/free-solid-svg-icons/faCrosshairs';
import { svgPathData as walkingSVG } from '@fortawesome/free-solid-svg-icons/faWalking';
import { PassengerTree, isPassengerDirectory, Passenger } 
    from '../../../../../leftPanel/components/passengerView/constants';

type KPMProps = { 
    coords: number[],
    gridBlockSize: number,
    simPassengers: PassengerSimData,
    scale: {
        x: number, 
        y: number
    },
    dimensions: number[],

    passengers: PassengerTree, 
    inspecting: InspectorState,
    passengerPaths: { [pID: number]: PassengerPath }

    onPassengerClick?: (id: number) => void
    onPassengerChange: (p: Passenger) => void
 }
const KonvaPassengerManager: React.FunctionComponent<KPMProps> = (props) => {
    const [activeSubComponent, setActiveSubComponent] = useState<number>(0);
    if(props.inspecting.componentType !== ComponentTypes.PASSENGER) return null;
    const passengerObj = props.passengers[props.inspecting.elementID];
    if(isPassengerDirectory(passengerObj)) return null;
    const dragFunc = CreateBoundingFunc(props.coords, props.dimensions);

    return <Layer x={props.coords[0]} y={props.coords[1]} 
        scale={props.scale}
    >
        <Circle
            id="grid-shadow-circ" 
            x={15} y={15}
            visible={false}
            radius={props.gridBlockSize/2}
            fill={'#FF7B17'}
            opacity={0.6}
            stroke={'#CF6412'}
            strokeWidth={2}
            dash={[20, 2]}
        />
        <KonvaPassengerPoint isHighlighted={activeSubComponent === 1} svgData= {flagSVG} 
            iconCoord={{x: -7, y: -8}} iconScale={{x: 0.03, y:0.03}} color={"#0abde3"}
            coords={[passengerObj.start.x, passengerObj.start.y]} boxSize={props.gridBlockSize}
            onClick={() => activeSubComponent === 1? setActiveSubComponent(0):setActiveSubComponent(1)} 
            onChange={(e: {x:number, y:number}) => props.onPassengerChange({...passengerObj, start: e})}
            dragBoundFunc={dragFunc} disabled={passengerObj.isLocked} /> 
        <KonvaPassengerPoint isHighlighted={activeSubComponent === 2} svgData= {crosshairSVG} 
            iconCoord={{x: -8.5, y: -9.5}} iconScale={{x: 0.035, y:0.035}} color={"#10ac84"}
            coords={[passengerObj.destination.x, passengerObj.destination.y]} boxSize={props.gridBlockSize}
            onClick={() => activeSubComponent === 2? setActiveSubComponent(0):setActiveSubComponent(2)} 
            onChange={(e: {x:number, y:number}) => props.onPassengerChange({...passengerObj, destination: e})}
            dragBoundFunc={dragFunc} disabled={passengerObj.isLocked} />
        <KonvaPassengerPoint isHighlighted={activeSubComponent === 3} svgData= {walkingSVG} 
            iconCoord={{x: -5.5, y: -9.5}} iconScale={{x: 0.035, y:0.035}} color={"#464646"}
            coords={[props.simPassengers[passengerObj.id].coordinates.x, props.simPassengers[passengerObj.id].coordinates.y]} 
            onClick={() => activeSubComponent === 3? setActiveSubComponent(0):setActiveSubComponent(3)} boxSize={props.gridBlockSize}
            onChange={(e: {x:number, y:number}) => {}} dragBoundFunc={dragFunc} disabled={true} />
        <KonvaPassengerPath />
    </Layer>
};

export default KonvaPassengerManager;