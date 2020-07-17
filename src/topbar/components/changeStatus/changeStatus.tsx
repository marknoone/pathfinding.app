import React, { useState, useEffect } from 'react';
import CSS from 'csstype';

type ChangeStatusProps = {
    lastChangeTimestamp: number
    isSaving: boolean
}

const BaseStyle: CSS.Properties = {
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: '"Open Sans", sans-serif',
    textDecoration: 'underline',
    color: '#b2bec3'
}

const GetChangeString = (currentTS: number, lastChangeTS: number) => {
    let diff = currentTS - lastChangeTS;
    let seconds = Math.floor(diff/1000);
    let mins = Math.floor(seconds/60);
    let hours = Math.floor(mins/60);

    if (hours >= 24) {
        return `Last change ${Math.floor(hours/24)} days ago`
    } else if (hours > 1) {
        return `Last change ${hours} hours ago`
    } else if(mins > 1){
        return `Last change ${mins} minutes ago`
    } else {
        return `All changes saved`
    }
}

const ChangeStatus: React.FunctionComponent<ChangeStatusProps> = (props) => {
    const [currentSeconds, setCurrentSeconds] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSeconds(Date.now());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return <p style={BaseStyle}>{ 
        props.isSaving? 
        "Saving...":
        GetChangeString(currentSeconds, props.lastChangeTimestamp) 
    }</p>;
}

export default ChangeStatus;