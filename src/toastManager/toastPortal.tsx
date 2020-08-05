import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ToastManager } from './toastManager';

const ToastPortal: React.FunctionComponent = (props) => {
    const mount = document.getElementById("toast-root");
    const el = document.createElement("div");

    useEffect(() => {
        if(mount) {
            mount.appendChild(el);
            return () => mount.removeChild(el);
        }
        return () => {};
    }, [el, mount]);

    return createPortal(<ToastManager />, el)
}

export default ToastPortal;