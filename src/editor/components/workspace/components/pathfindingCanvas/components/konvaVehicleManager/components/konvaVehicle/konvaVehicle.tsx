import React from 'react';
import { Text, Rect, Group } from "react-konva";

type KVProps = { angle:number, coords: number[], capacity: number[] }
const KonvaVehicle: React.FunctionComponent<KVProps> = (props) => {
    return <Group  x={props.coords[0]}  y={props.coords[1]} rotation={props.angle}>
    <Rect
        fill="#ee5253"
        width={50} height={25}
        shadowColor={'black'}
        shadowBlur={4}
        shadowOffset={{ x: 1, y: 1 }}
        shadowOpacity={0.5}
    />
    <Text
        fontStyle={'normal'}
        fill={'white'}
        fontSize={12}
        fontFamily={'Montserrat'}
        align={'center'}
        width={50} height={25}
        verticalAlign={'middle'}
        text={`${props.capacity[0]} / ${props.capacity[1]}`}
        />
    </Group>
}

export default KonvaVehicle;