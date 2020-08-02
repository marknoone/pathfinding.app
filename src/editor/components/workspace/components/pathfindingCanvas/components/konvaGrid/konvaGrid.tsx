import React from 'react';
import { KonvaEventObject } from 'konva/types/Node';
import _ from 'lodash';
import { Layer, Rect, Line } from "react-konva";

type KGProps = { 
    blockSize: number, 
    coords: number[], 
    dimensions: number[],
    scale: { x: number, y: number }

    onCoordChange?: (newCoords: number[]) => void
    onScaleChange?: (e: {
        newCoords: number[],
        newScale: {x: number, y: number},
    }) => void;
}

const KonvaGrid: React.FunctionComponent<KGProps> = (props) =>
    <Layer draggable
            x={props.coords[0]} 
            y={props.coords[1]}
            width={props.dimensions[0]} 
            height={props.dimensions[1]}
            scale={props.scale}
            onDragMove={(e:KonvaEventObject<DragEvent>) => { 
                if(props.onCoordChange)
                    props.onCoordChange([
                        e.target.attrs["x"] as number,
                        e.target.attrs["y"] as number
                    ])
            }}
            onDragEnd={(e:KonvaEventObject<DragEvent>) => { 
                if(props.onCoordChange)
                    props.onCoordChange([
                        e.target.attrs["x"] as number,
                        e.target.attrs["y"] as number
                    ])
            }}
            onWheel={(e: KonvaEventObject<WheelEvent>) => {
                e.evt.preventDefault();
                const   layer = e.target.getLayer(), 
                        stage = e.target.getStage(),
                        scaleBy = 1.05;
                if(!layer || !props.onScaleChange || !stage) return
                    
                const oldScale = layer.scaleX();
                const pointer = stage.getPointerPosition();
                if(!pointer) return

                const mousePointTo = {
                    x: (pointer.x - layer.x()) / oldScale,
                    y: (pointer.y - layer.y()) / oldScale,
                };

                const newScale =
                    -e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        
                props.onScaleChange({
                    newCoords: [
                        pointer.x - mousePointTo.x * newScale,
                        pointer.y - mousePointTo.y * newScale
                    ],
                    newScale: { x: newScale, y: newScale }
                });
            }}
        >
            <Rect x={0} y={0}
                width={props.dimensions[0]} 
                height={props.dimensions[1]} 
                fill={"white"}
                shadowColor={'black'}
                shadowBlur={6}
                shadowOffset={{x: 0, y: 1}}
                shadowOpacity={0.2}
                onMouseDown={(e: KonvaEventObject<MouseEvent>) => {
                    const stage = e.target.getStage()
                    if(stage)
                        stage.container().style.cursor = "grabbing";
                }}
                onMouseUp={(e: KonvaEventObject<MouseEvent>) => {
                    const stage = e.target.getStage()
                    if(stage)
                        stage.container().style.cursor = "grab";
                }}
                onMouseEnter={e => {
                    const stage = e.target.getStage()
                    if(stage)
                        stage.container().style.cursor = "grab";
                }}
                onMouseLeave={e => {
                    const stage = e.target.getStage()
                    if(stage)
                        stage.container().style.cursor = "default";
                }}
                    />
            {
                _.range(0, props.dimensions[0]/props.blockSize).map( 
                    (i:number) => <Line key={i} stroke="#ddd" strokeWidth={0.5}
                        points={[
                            Math.round(i * props.blockSize) + 0.5, 0,
                            Math.round(i * props.blockSize) + 0.5, 
                            props.dimensions[1],
                        ]} />
                )
            }
            {
                _.range(0, props.dimensions[1]/props.blockSize).map( 
                    (i:number) => <Line key={i} stroke="#ddd" strokeWidth={0.5}
                    points={[
                        0, Math.round(i * props.blockSize) + 0.5,
                        props.dimensions[0], 
                        Math.round(i * props.blockSize) + 0.5, 
                    ]} />
                )
            }
    </Layer>;

export default KonvaGrid;