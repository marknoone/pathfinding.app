import React from 'react';
import { Group, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Algorithms } 
    from '../../../../../../../rightPanel/components/simulationView/constants';
import { PassengerPath, PathSegment, PathSegmentNode } 
    from '../../../../../../../../../app/pkg/simulation';
import { round } from 'lodash';

type KPPProps = {
    boxSize: number
    path: PassengerPath
    isHighlighted: boolean

    onClick: () => void
};

const ColourMap: { [alg: string]: string } = {
    [Algorithms.Dijkstra]:                          "#ff9f43", // Orange
    [Algorithms.TimeDependentDijkstra]:             "#2e86de", // Blue
    [Algorithms.MultiModalTimeDependentDijkstra]:   "#5758BB", // Purple
    [Algorithms.CMTDijkstra]:                       "#10ac84", // Green
}

const KonvaPassengerPath: React.FunctionComponent<KPPProps> = (props) => <Group
    onClick={(e: KonvaEventObject<MouseEvent>) => {
        if(props.onClick)
            props.onClick();
    }}>
        {
            Object.keys(props.path).map((alg: string) => {
                let pathPoints: number[] = [];
                const color = ColourMap[alg], path = props.path[alg];

                path.path.data.forEach((seg: PathSegment, i:number) => {
                    seg.nodes.forEach((n: PathSegmentNode) => {
                        if(n.isLast && i !== path.path.data.length-1) return;
                        pathPoints.push(n.coord.x, n.coord.y); 
                    });
                });
                
                return <Line key={alg} points={pathPoints} lineJoin={'round'}
                    stroke={color} strokeWidth={4} fill={color} dash={[30, 10]}
                    onClick={(e: KonvaEventObject<MouseEvent>) => props.onClick()}
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
            })
        }
    </Group>;


export default KonvaPassengerPath;