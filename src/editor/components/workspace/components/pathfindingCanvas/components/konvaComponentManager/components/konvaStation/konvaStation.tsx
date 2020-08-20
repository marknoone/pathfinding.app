import React from 'react';
import Konva from 'konva';
import { Circle, Path, Group } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import { svgPathData } from '@fortawesome/free-solid-svg-icons/faMapPin';
import { Vector2d } from 'konva/types/types';
import { Layer } from 'konva/types/Layer';

type KSProps = { 
    colour: string, 
    boxSize: number,
    coords: number[],
    isHighlighted: boolean,
    disabled?: boolean,

    startLineIDs: string[],
    endLineIDs: string[],

    dragBoundFunc: (pos: Vector2d) => Vector2d
    onClick?: (e: KonvaEventObject<MouseEvent>) => void
    onChange: (newCoords: {x: number,  y: number}) => void
}

const KonvaStation: React.FunctionComponent<KSProps> = (props) => {
    const evaluateRouteLines = (e: KonvaEventObject<MouseEvent>, layer: Layer) => {
        if(props.startLineIDs.length > 0) {
            props.startLineIDs.map( id => {
                const obj = layer.findOne(`#${id}`)
                const objTri = layer.findOne(`#${id}-polygon`)
                if(!obj) return;
                const p = obj.attrs["points"]
                obj.setAttr("points", [
                    e.target.x(),
                    e.target.y(),
                    p[2], p[3],
                ]);
                if(!objTri) return;
                objTri.setAttr("x", (e.target.x()+p[2])/2);
                objTri.setAttr("y", (e.target.y()+p[3])/2);
                objTri.setAttr("rotation",  (Math.atan2(
                    (p[3] - e.target.y()),
                    (p[2] - e.target.x())
                ) * (180/Math.PI)) + 90);
                    
            });
        }

        if(props.endLineIDs.length > 0){
            props.endLineIDs.map( id => {
                const obj = layer.findOne(`#${id}`)
                const objTri = layer.findOne(`#${id}-polygon`)
                if(!obj) return;
                const p = obj.attrs["points"]
                obj.setAttr("points", [
                    p[0], p[1],
                    e.target.x(),
                    e.target.y(),
                ]);;
                if(!objTri) return;
                objTri.setAttr("x", (e.target.x()+p[0])/2);
                objTri.setAttr("y", (e.target.y()+p[1])/2);
                objTri.setAttr("rotation",  (Math.atan2(
                    (p[1] - e.target.y()),
                    (p[0] - e.target.x())
                ) * (180/Math.PI)) - 90);
                    
            });
        };
    }

    return <Group draggable={!props.disabled}
        x={props.coords[0]} y={props.coords[1]}
        dragBoundFunc={props.dragBoundFunc}
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
            const shadowRect = layer.findOne("#grid-shadow-rect");
            shadowRect.position({
                x: Math.round(e.target.x()-(props.boxSize/2) / props.boxSize) * props.boxSize,
                y: Math.round(e.target.y()-(props.boxSize/2) / props.boxSize) * props.boxSize
            });
            shadowRect.show();
            evaluateRouteLines(e, layer);
        }}
        onDragMove={(e: KonvaEventObject<MouseEvent>) => {
            const layer = e.target.getLayer() as Konva.Layer
            const shadowRect = layer.findOne("#grid-shadow-rect");
            shadowRect.position({
                x: Math.round((e.target.x()-(props.boxSize/2)) / props.boxSize) * props.boxSize,
                y: Math.round((e.target.y()-(props.boxSize/2)) / props.boxSize) * props.boxSize
            });
            evaluateRouteLines(e, layer);
        }}
        onDragEnd={(e: KonvaEventObject<MouseEvent>) => {
            const layer = e.target.getLayer() as Konva.Layer;
            const shadowRect = layer.findOne("#grid-shadow-rect");
            const x = Math.round(shadowRect.x()+(props.boxSize/2)),
                  y = Math.round(shadowRect.y()+(props.boxSize/2));
            e.target.position({x: x, y: y});
            shadowRect.hide();
            evaluateRouteLines(e, layer);
            props.onChange({x, y});
        }}
        onClick={(e: KonvaEventObject<MouseEvent>) => {
            if(props.onClick)
                props.onClick(e);
        }}
    >
        {
            props.isHighlighted?
            <Circle fill={"#0984e3"} radius={18} />:
            null
        }
        <Circle fill={props.colour} radius={15} />
        <Circle radius={11} fill="#ffffff" />
        <Path x={-4} y={-8} fill="#ddd"
            scale={{x: 0.03, y: 0.03}}
            data={svgPathData} 
        />
    </Group>
}

export default KonvaStation;