import React, { useState } from 'react';
import PassengerDirectoryElement from './passengerDirElem'
import {
    BaseStyle,
    PassengerElementStyle
} from './passengerView.css';

export type IDProps = {
    id: number
}

const PassengerView: React.FunctionComponent = (props) => {
    return <div style={BaseStyle}>
        <PassengerDirectoryElement id={0}/>
    </div>;
}


const PassengerElement: React.FunctionComponent<IDProps> = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    return <div style={PassengerElementStyle}>

    </div>
}


export default PassengerView;