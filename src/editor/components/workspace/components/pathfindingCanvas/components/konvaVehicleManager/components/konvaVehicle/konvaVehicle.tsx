import React from 'react';
import { Rect } from "react-konva";

type KVProps = { angle:number, coords: number[] }
const KonvaVehicle: React.FunctionComponent<KVProps> = (props) => {
    return <Rect
        x={props.coords[0]}
        y={props.coords[1]}
        width={20}
        height={10}
        fill="#ee5253"
        rotation={props.angle}
    />
}

export default KonvaVehicle;