import React from 'react';
import { Layer } from "react-konva";

type KCMProps = { coords: number[], gridBlockSize: number }
const KonvaComponentManager: React.FunctionComponent<KCMProps> = (props) => {
    return <Layer x={props.coords[0]} y={props.coords[1]}>
    </Layer>;
}

export default KonvaComponentManager;