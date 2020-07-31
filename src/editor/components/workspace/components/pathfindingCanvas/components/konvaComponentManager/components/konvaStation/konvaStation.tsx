import React from 'react';
import Konva from 'konva';
import { Circle, Path, Group } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import { svgPathData } from '@fortawesome/free-solid-svg-icons/faBus';

type KSProps = { coords: number[], colour: string }
const KonvaStation: React.FunctionComponent<KSProps> = (props) => {
    return <Group draggable
        x={props.coords[0]} y={props.coords[1]}
        onMouseEnter={(e: KonvaEventObject<MouseEvent>) => {
            const stage = e.target.getStage()
            if(stage)
                stage.container().style.cursor = "pointer";
        }}
        onMouseLeave={(e: KonvaEventObject<MouseEvent>) => {
            const stage = e.target.getStage()
            if(stage)
                stage.container().style.cursor = "default";
        }}
        onDragMove={(e: KonvaEventObject<MouseEvent>) => {
            const layer = e.target.getLayer() as Konva.Layer
            const obj = layer.findOne("#testing")
            const p = obj.attrs["points"]
            obj.setAttr("points", [
                e.target.x(),
                e.target.y(),
                p[2], p[3]
            ]);
        }}
    >
        <Circle fill={props.colour} radius={25} />
        <Circle radius={17} fill="#ffffff" />
        <Path x={-10} y={-10} fill="#ddd"
            scale={{x: 0.04, y: 0.04}}
            data={svgPathData} 
        />
    </Group>
}

export default KonvaStation;