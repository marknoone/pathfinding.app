import React from 'react';
import _ from 'lodash';
import { Layer, Rect, Line } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';

type KGProps = { 
    blockSize: number, 
    coords: number[], 
    dimensions: number[],

    onCoordChange?: (newCoords: number[]) => void
}
const KonvaGrid: React.FunctionComponent<KGProps> = (props) =>
    <Layer draggable
            x={props.coords[0]} 
            y={props.coords[1]}
            width={props.dimensions[0]} 
            height={props.dimensions[1]}
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
        >
            <Rect x={0} y={0}
                width={props.dimensions[0]} 
                height={props.dimensions[1]} 
                fill={"white"}
                shadowColor={'black'}
                shadowBlur={6}
                shadowOffset={{x: 0, y: 1}}
                shadowOpacity={0.2}
                onMouseEnter={e => {
                    const stage = e.target.getStage()
                    if(stage)
                        stage.container().style.cursor = "pointer";
                  }}
                onMouseLeave={e => {
                    const stage = e.target.getStage()
                    if(stage)
                        stage.container().style.cursor = "default";
                }}
                    />
            {
                _.range(0, props.dimensions[0]/props.blockSize).map( 
                    (i:number) => <Line stroke="#ddd" strokeWidth={0.5}
                        points={[
                            Math.round(i * props.blockSize) + 0.5, 0,
                            Math.round(i * props.blockSize) + 0.5, 
                            props.dimensions[1],
                        ]} />
                )
            }
            {
                _.range(0, props.dimensions[1]/props.blockSize).map( 
                    (i:number) => <Line stroke="#ddd" strokeWidth={0.5}
                    points={[
                        0, Math.round(i * props.blockSize) + 0.5,
                        props.dimensions[0], 
                        Math.round(i * props.blockSize) + 0.5, 
                    ]} />
                )
            }
    </Layer>;

export default KonvaGrid;