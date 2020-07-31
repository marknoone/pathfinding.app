import React from 'react';
import { Layer, Rect } from "react-konva";

const KonvaBG: React.FunctionComponent<{dimensions: number[], fill: string}> 
= (props) => <Layer listening={false}>
    <Rect
        x={0} y={0}
        width={props.dimensions[0]} 
        height={props.dimensions[1]}
        fill={props.fill}
        />
    </Layer>

export default KonvaBG;