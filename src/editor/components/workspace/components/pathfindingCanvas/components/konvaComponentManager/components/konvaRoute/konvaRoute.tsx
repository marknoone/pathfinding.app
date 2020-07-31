import React from 'react';
import { Line } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

type KRProps = { toFrom: number[][], colour: string}
const KonvaRoute: React.FunctionComponent<KRProps> = (props) => {
    return <Line
        id="testing"
        points={[...props.toFrom[0], ...props.toFrom[1]]}
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