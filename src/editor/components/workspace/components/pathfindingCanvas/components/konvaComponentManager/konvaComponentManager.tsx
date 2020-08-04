import React from 'react';
import { Layer } from "react-konva";
import { KonvaStation } from './components/konvaStation';
import { KonvaRoute } from './components/konvaRoute';
import { StationDataObj, RouteDataObj } 
    from '../../../../../leftPanel/components/componentView/constants';

type KCMProps = { 
    coords: number[], 
    gridBlockSize: number, 
    scale: { 
        x: number, 
        y:number 
    }

    stations: StationDataObj,
    routes: RouteDataObj,

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
        {
            /* Draw routes */
            Object.keys(props.routes).map((k: string) => {
                const idx = parseInt(k, 10)
                if(isNaN(idx)) return null;

                var returnedElems = [];
                const route = props.routes[idx];
                for(var i = 1; i < route.stations.length; i++){
                    const curr = props.stations[route.stations[i]];
                    const prev = props.stations[route.stations[i-1]];
                    const routeID = `route-${route.id}-${i}`
                    stationRouteMap[curr.id].end.push(routeID);
                    stationRouteMap[prev.id].start.push(routeID);
                    returnedElems.push(
                        <KonvaRoute key={routeID} id={routeID} 
                            name={route.name} colour={route.color}
                            to={[curr.coordinates.x, curr.coordinates.y]} 
                            from={[prev.coordinates.x, prev.coordinates.y]} />);
                }

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
                    onChange={c => props.onStationCoordChange(stn.id, c)}/>
            })
        }
    </Layer>;
}

export default KonvaComponentManager;