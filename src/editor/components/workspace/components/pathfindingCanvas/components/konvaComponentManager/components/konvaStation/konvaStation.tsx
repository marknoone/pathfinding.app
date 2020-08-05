import React from 'react';
import Konva from 'konva';
import { Circle, Path, Group } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import { svgPathData } from '@fortawesome/free-solid-svg-icons/faMapPin';

type KSProps = { 
    colour: string, 
    coords: number[],
    isHighlighted: boolean,

    startLineIDs: string[],
    endLineIDs: string[],

    onClick?: (e: KonvaEventObject<MouseEvent>) => void
    onChange: (newCoords: {x: number,  y: number}) => void
}

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
            if(props.startLineIDs.length > 0) {
                props.startLineIDs.map( id => {
                    const obj = layer.find(`#${id}`)
                    if(!obj) return;
                    obj.each((o) => {
                        const p = o.attrs["points"]
                        o.setAttr("points", [
                            e.target.x(),
                            e.target.y(),
                            p[2], p[3],
                            
                        ]);
                    });
                });
            }

            if(props.endLineIDs.length > 0){
                props.endLineIDs.map( id => {
                    const obj = layer.find(`#${id}`)
                    if(!obj) return;

                    obj.each((o) => {
                        const p = o.attrs["points"]
                        o.setAttr("points", [
                            p[0], p[1],
                            e.target.x(),
                            e.target.y(),
                        ]);
                    });
                });
            };
        }}
        onDragEnd={(e: KonvaEventObject<MouseEvent>) => {
            const x = e.target.x(), y = e.target.y();
            props.onChange({x, y});
        }}
        onClick={(e: KonvaEventObject<MouseEvent>) => {
            if(props.onClick)
                props.onClick(e);
        }}
    >
        {
            props.isHighlighted?
            <Circle fill={"#0984e3"} radius={30} />:
            null
        }
        <Circle fill={props.colour} radius={25} />
        <Circle radius={17} fill="#ffffff" />
        <Path x={-6} y={-10} fill="#ddd"
            scale={{x: 0.04, y: 0.04}}
            data={svgPathData} 
        />
    </Group>
}

export default KonvaStation;