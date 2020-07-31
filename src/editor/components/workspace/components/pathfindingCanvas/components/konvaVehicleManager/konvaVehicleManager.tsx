import React from 'react';
import { Layer } from 'react-konva';

type KVMProps = {
    coords: number[], 
    scale: { 
        x: number, 
        y:number 
    }
}

const KonvaVehicleManager: React.FunctionComponent<KVMProps> = (props) => {
    return <Layer></Layer>;
};

export default KonvaVehicleManager;
