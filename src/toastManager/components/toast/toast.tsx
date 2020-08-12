import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastType, ToastNotification } from '../../constants';
import { BaseStyle, ToastIcon, ToastMessage } from './toast.css';
import { 
    faExclamationCircle, 
    faTimesCircle, 
    faInfoCircle,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

type ToastProps = {
    t: ToastNotification
    onToastExpired?: () => {}
}

const ToastLifetime_MS = 5000;
const toastDeps = {
    [ToastType.TOAST_ERR]:      { bg: "#ff7675", primary: "#d63031", icon: faTimesCircle },
    [ToastType.TOAST_INFO]:     { bg: "#74b9ff", primary: "#0984e3", icon: faInfoCircle },
    [ToastType.TOAST_SUCCESS]:  { bg: "#55efc4", primary: "#00b894", icon: faThumbsUp },
    [ToastType.TOAST_WARN]:     { bg: "#ffeaa7", primary: "#fdcb6e", icon: faExclamationCircle },
}

const Toast: React.FunctionComponent<ToastProps> = (props) => {
    const {bg, primary, icon} = toastDeps[props.t.type];
    const [lifetimeTimer, setLifetimeTimer] = useState<NodeJS.Timeout>(
        (Date.now() - props.t.createdAt) > 0?
        setTimeout(() => {
            if(props.onToastExpired)
                props.onToastExpired();
        }, ToastLifetime_MS - (Date.now() - props.t.createdAt)):
        setTimeout(() => {
            if(props.onToastExpired)
                props.onToastExpired();
        }, 10)
    );

    useEffect(() => {
        return () => clearTimeout(lifetimeTimer);
    }, []);

    return <div style={{...BaseStyle, backgroundColor: '#fff', border: `1px solid ${bg}`}}>
        <div style={{...ToastIcon, color: primary}}>
            <FontAwesomeIcon icon={icon} />
        </div>
        <p style={{...ToastMessage, color: primary}}>{props.t.msg}</p>
    </div>
}

export default Toast;