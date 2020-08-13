import React from 'react';
import { Group, Circle, Path } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';


type KPDProps = { 
    color: string,
    svgData: string,
    boxSize: number,
    coords: number[], 
    isHighlighted: boolean,
    iconCoord: {x: number, y:number},
    iconScale: {x: number, y:number},

    onClick?: () => void
    onChange?: (e: {x:number, y:number}) => void 
}

const KonvaPassengerDeparture: React.FunctionComponent<KPDProps> = (props) => {
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
        onDragStart={(e: KonvaEventObject<MouseEvent>) => {
            const layer = e.target.getLayer() as Konva.Layer;
            const shadowCirc = layer.findOne("#grid-shadow-circ");
            shadowCirc.position({
                x: (Math.round((e.target.x()-15) / props.boxSize) * props.boxSize) + 15,
                y: (Math.round((e.target.y()-15) / props.boxSize) * props.boxSize) + 15
            });
            shadowCirc.show();
        }}
        onDragMove={(e: KonvaEventObject<MouseEvent>) => {
            const layer = e.target.getLayer() as Konva.Layer
            const shadowCirc = layer.findOne("#grid-shadow-circ");
            shadowCirc.position({
                x: (Math.round((e.target.x()-15) / props.boxSize) * props.boxSize) + 15,
                y: (Math.round((e.target.y()-15) / props.boxSize) * props.boxSize) + 15
            });
        }}
        onDragEnd={(e: KonvaEventObject<MouseEvent>) => {
            const layer = e.target.getLayer() as Konva.Layer;
            const shadowCirc = layer.findOne("#grid-shadow-circ");
            const x = (Math.round((shadowCirc.x()-15) / props.boxSize) * props.boxSize) + 15,
                  y = (Math.round((shadowCirc.y()-15) / props.boxSize) * props.boxSize) + 15;
            e.target.position({x: x, y: y});
            shadowCirc.hide();
            if(props.onChange)
                props.onChange({x, y});
        }}
        onClick={(e: KonvaEventObject<MouseEvent>) => {
            if(props.onClick)
                props.onClick();
        }}
    >
        {
            props.isHighlighted?
            <Circle fill={"#0984e3"} radius={15} />:
            null
        }
        <Circle radius={15} fill={props.color}
            shadowColor={'black'}
            shadowBlur={4}
            shadowOffset={{ x: 0, y: 1 }}
            shadowOpacity={0.3}
        />
        <Path fill="#fff" 
            x={props.iconCoord.x} 
            y={props.iconCoord.y} 
            scale={props.iconScale}
            data={props.svgData}
        />
    </Group>
};

export default KonvaPassengerDeparture;