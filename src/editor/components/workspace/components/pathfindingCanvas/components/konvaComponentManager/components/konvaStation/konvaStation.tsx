import React from 'react';
import { Circle, Path } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import { svgPathData } from '@fortawesome/free-solid-svg-icons/faBus';

type KSProps = { coords: number[], colour: string }
const KonvaStation: React.FunctionComponent<KSProps> = (props) => {
    return <>
        <Circle
            x={props.coords[0]}
            y={props.coords[1]}
            fill={props.colour}
            radius={25}
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
        />
        <Circle
            x={props.coords[0]}
            y={props.coords[1]}
            radius={17}
            fill="#ffffff"
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
        />
        <Path 
            x={props.coords[0]-10}
            y={props.coords[1]-10}
            scale={{x: 0.04, y: 0.04}}
            data={svgPathData}
            fill="#ddd"
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
        />
        
        
    </>
}

export default KonvaStation;