import React from 'react';
import { Layer, Rect } from "react-konva";
import { KonvaStation } from './components/konvaStation';
import { KonvaRoute } from './components/konvaRoute';
import { StationDataObj, RouteDataObj } 
    from '../../../../../leftPanel/components/componentView/constants';
import { InspectorState } from '../../../../../rightPanel/components/inspectorView/constants';
import { ComponentTypes } from '../../../../../../constants';
import { KonvaEventObject } from 'konva/types/Node';

type KCMProps = { 
    coords: number[], 
    gridBlockSize: number, 
    scale: { 
        x: number, 
        y:number 
    }

    stations: StationDataObj,
    routes: RouteDataObj,
    inspecting: InspectorState

    onRouteClick?: (id: number) => void
    onStationClick?: (id: number) => void
    onStationCoordChange: 
        (id: number, newCoords: {x: number, y:number}) => void
}

const KonvaComponentManager: React.FunctionComponent<KCMProps> = (props) => {
    var stationRouteMap: {[key: number]: {start: string[], end:string[]}} = [];
    Object.keys(props.stations).forEach((k:string) => {
        const idx = parseInt(k, 10)
        if(isNaN(idx)) return null;
        stationRouteMap[idx] = {start: [], end:[]}
    });

    return <Layer x={props.coords[0]} y={props.coords[1]} scale={props.scale}>
        <Rect
            id="grid-shadow-rect" 
            x={0} y={0}
            visible={false}
            width={props.gridBlockSize * 2}
            height={props.gridBlockSize * 2}
            fill={'#FF7B17'}
            opacity={0.6}
            stroke={'#CF6412'}
            strokeWidth={3}
            dash={[20, 2]}
        />
        {
            /* Draw routes */
            Object.keys(props.routes).map((k: string) => {
                const idx = parseInt(k, 10)
                if(isNaN(idx)) return null;

                var returnedElems: JSX.Element[] = [];
                const route = props.routes[idx];
                const sortedKeys = Object.keys(route.stations).sort();
                sortedKeys.forEach((key, i) => {
                    if( i < 1) return;
                    const prevKey = sortedKeys[i-1]
                    const curr = props.stations[route.stations[+key]];
                    const prev = props.stations[route.stations[+prevKey]];
                    const routeID = `route-${route.id}-${i}`
                    stationRouteMap[curr.id].end.push(routeID);
                    stationRouteMap[prev.id].start.push(routeID);
                    returnedElems.push(
                        <KonvaRoute key={routeID} id={routeID} 
                            name={route.name} colour={route.color}
                            to={[curr.coordinates.x, curr.coordinates.y]} 
                            from={[prev.coordinates.x, prev.coordinates.y]} 
                            onClick={(e: KonvaEventObject<MouseEvent>) => {
                                if(props.onRouteClick)
                                    props.onRouteClick(route.id);
                            }}
                            isHighlighted={
                                props.inspecting.componentType === ComponentTypes.ROUTE 
                                && props.inspecting.elementID === route.id
                            }/>);
                });

                return returnedElems; 
            })

        }

        {
            /* Print stations */
            Object.keys(props.stations).map((k:string) => {
                const idx = parseInt(k, 10)
                if(isNaN(idx)) return null;
                const stn = props.stations[idx];
                return <KonvaStation key={stn.id} colour="#464646" 
                    startLineIDs={stationRouteMap[stn.id].start} 
                    endLineIDs={stationRouteMap[stn.id].end}
                    coords={[stn.coordinates.x, stn.coordinates.y]}
                    onClick={(e: KonvaEventObject<MouseEvent>) => {
                        if(props.onStationClick)
                            props.onStationClick(stn.id);
                    }}
                    boxSize={props.gridBlockSize}
                    onChange={c => props.onStationCoordChange(stn.id, c)}
                    isHighlighted={
                        props.inspecting.componentType === ComponentTypes.STATION 
                        && props.inspecting.elementID === stn.id
                    }/>
            })
        }
    </Layer>;
}

export default KonvaComponentManager;