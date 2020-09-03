import React, { useState, useEffect } from 'react';
import { update } from 'lodash';
import { Layer } from 'react-konva';
import { KonvaVehicle } from './components/konvaVehicle';
import { VehiclesState } from '../../../../../leftPanel/components/componentView/constants';
import { VehicleSimData } from '../../../../../../../app/pkg/simulation';

type KVMProps = {
    coords: number[],
    vehicles: VehiclesState,
    simVehicles: VehicleSimData,
    scale: { 
        x: number, 
        y:number 
    }
}

const KonvaVehicleManager: React.FunctionComponent<KVMProps> = (props) => 
    <Layer x={props.coords[0]} y={props.coords[1]} 
        scale={{
            x: props.scale.x, 
            y: props.scale.y
    }}>
        {
            Object.keys(props.simVehicles).map((k:string) =>{
                const v = props.simVehicles[+k];
                return <KonvaVehicle angle={v.angle} key={+k}
                    coords={[v.coordinate.x, v.coordinate.y]} 
                    capacity={[v.passengerCnt,
                        props.vehicles.data[v.originalVID].capacity]} />
            })
        }
    </Layer>;

export default KonvaVehicleManager;
