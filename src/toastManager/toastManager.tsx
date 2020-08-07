import React from 'react';
import { AppState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { ToastNotification } from './components/toast';
import { DeleteToastNotification } from './actions';
import {
    BaseStyle,
    NotificationContainer
} from './toastManager.css';

export const ToastManager: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const toastQueue = useSelector((state:AppState) => state.toasts.sortedQueue);

    return <div style={BaseStyle}>
        <div style={NotificationContainer}>
            {
                toastQueue.map((t, i) => {
                    return <div style={{margin: "10px 0px"}} key={i}>
                            <ToastNotification t={t} 
                            onToastExpired={() => dispatch(
                                DeleteToastNotification(i)
                            )}/>
                        </div>
                })
            }
        </div>
    </div>;
};


