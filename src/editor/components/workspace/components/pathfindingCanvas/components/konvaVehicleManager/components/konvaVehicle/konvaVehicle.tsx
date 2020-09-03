import React from 'react';
import { Text, Rect, Group } from "react-konva";

type KVProps = { angle:number, coords: number[], capacity: number[] }
const KonvaVehicle: React.FunctionComponent<KVProps> = (props) => {
    return <Group  x={props.coords[0]}  y={props.coords[1]} rotation={props.angle}>
    <Rect
        fill="#464646"
        width={50} height={25}
        shadowColor={'black'}
        shadowBlur={4}
        cornerRadius={6}
        shadowOffset={{ x: 1, y: 1 }}
        shadowOpacity={0.5}
    />
    <Rect
        fill="#ee5253"
        x={2} y={2}
        width={46} height={21}
        shadowColor={'black'}
        shadowBlur={4}
        cornerRadius={6}
        shadowOffset={{ x: 1, y: 1 }}
        shadowOpacity={0.5}
    />
    <Text
        fontSize={12}
        fill={'white'}
        fontStyle={'normal'}
        fontFamily={'Montserrat'}
        align={'center'}
        width={50} height={25}
        verticalAlign={'middle'}
        text={`${props.coords}`}
        // text={`${props.capacity[0]} / ${props.capacity[1]}`}
        />
    </Group>
}

export default KonvaVehicle;