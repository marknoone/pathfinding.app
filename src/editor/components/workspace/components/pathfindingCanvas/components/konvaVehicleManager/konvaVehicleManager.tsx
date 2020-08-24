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

const KonvaVehicleManager: React.FunctionComponent<KVMProps> = (props) => {
    const [rAF, setrAF] = useState<number>(0);
    useEffect(() => {
        // setrAF(requestAnimationFrame(updateVehicles))
        return () => {
            cancelAnimationFrame(rAF);
        }
    }, [])

    const updateVehicles = () => {
        console.log("Works!");
        setrAF(requestAnimationFrame(updateVehicles));
    }

    return <Layer x={props.coords[0]} y={props.coords[1]} 
        scale={{
            x: props.scale.x, 
            y: props.scale.y
    }}>
        {

        }
    </Layer>;
};

export default KonvaVehicleManager;
