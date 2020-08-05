import React from 'react';
import { Line } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

type KRProps = { 
    id: string, 
    name: string, 
    colour: string
    isHighlighted: boolean

    to: number[], 
    from: number[], 

    onClick?: (e: KonvaEventObject<MouseEvent>) => void
}

const KonvaRoute: React.FunctionComponent<KRProps> = (props) => {
    // const angle = Math.atan2(
    //     (props.to[1] - props.from[1]),
    //     (props.to[0] - props.from[0])
    // ) * (180/Math.PI);
    return <>
        {/* Use a hover tooltip */}
        {
            props.isHighlighted?
            <Line 
                id={props.id}
                points={[...props.from, ...props.to]}
                stroke={"#fdcb6e"}
                strokeWidth={12}
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
            />:
            null
        }
        <Line
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
            onClick={(e: KonvaEventObject<MouseEvent>) => {
                if(props.onClick)
                    props.onClick(e);
            }}
        />
        
    </>
}

export default KonvaRoute;