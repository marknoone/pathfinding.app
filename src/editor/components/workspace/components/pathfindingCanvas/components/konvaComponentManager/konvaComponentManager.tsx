import React from 'react';
import { Layer } from "react-konva";
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../store';
import { KonvaStation } from './components/konvaStation';
import { KonvaRoute } from './components/konvaRoute';
import { Passenger } from '../../../../../leftPanel/components/passengerView/constants';
import { Station, Route, StationDataObj, RouteDataObj } 
    from '../../../../../leftPanel/components/componentView/constants';

type KCMProps = { 
    coords: number[], 
    gridBlockSize: number, 
    scale: { 
        x: number, 
        y:number 
    }
}

const KonvaComponentManager: React.FunctionComponent<KCMProps> = (props) => {
    return <Layer x={props.coords[0]} y={props.coords[1]} scale={props.scale}>

        {/* Print routes */}
        <KonvaRoute toFrom={[[60, 60], [500, 500]]} colour="#ff6b6b"/>

        {/* Print stations */}
        <KonvaStation coords={[60, 60]} colour="#ff6b6b"/>
        <KonvaStation coords={[500, 500]} colour="#ff6b6b"/>

        {/* Animate vehicles */}
    </Layer>;
}

export default KonvaComponentManager;