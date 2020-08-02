import React from 'react';
import { Line } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

type KRProps = { id: string, to: number[], from: number[], colour: string}
const KonvaRoute: React.FunctionComponent<KRProps> = (props) => {
    return <Line
        id={props.id}
        points={[...props.from, ...props.to]}
        stroke={props.colour}
        strokeWidth={8}
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
}

export default KonvaRoute;