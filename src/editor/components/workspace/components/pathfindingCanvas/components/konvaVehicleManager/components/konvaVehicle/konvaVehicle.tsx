import React from 'react';
import { Text, Rect, Group } from "react-konva";

type KVProps = { angle:number, coords: number[] }
const KonvaVehicle: React.FunctionComponent<KVProps> = (props) => {
    return <Group 
        x={props.coords[0]}
        y={props.coords[1]}
        rotation={props.angle}
    >
    <Rect
        width={20}
        height={10}
        fill="#ee5253"
    />
    <Text
        fontFamily={'Montserrat'}
        fontSize={14}
        align={'center'}
        text={`${5}/${12}`}
        />
    </Group>
}

export default KonvaVehicle;