import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import SimulationBakingScreen from './simulationBakingScreen';

const ToastPortal: React.FunctionComponent = (props) => {
    const mount = document.getElementById("loading-root");
    const el = document.createElement("div");

    useEffect(() => {
        if(mount) {
            mount.appendChild(el);
            return () => mount.removeChild(el);
        }
        return () => {};
    }, [el, mount]);

    return createPortal(<SimulationBakingScreen />, el)
}

export default ToastPortal;