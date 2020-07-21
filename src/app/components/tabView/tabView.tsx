import React, { useState } from 'react';
import {
    BaseStyle,
    TabContent,
    TabHeaders,
    TabHeader,
    TabHeaderActive
} from './tabView.css';

type TabViewProps = {
    views: {header:string, view:JSX.Element}[]
}

const TabView: React.FunctionComponent<TabViewProps> = (props) => {
    const [viewIdx, setViewIdx] = useState(0);
    
    return <div style={BaseStyle}>
        <div style={TabHeaders}>
        {
            props.views.map( (v, i) => (
                <div 
                onClick={() => {setViewIdx(i)}}
                style={{
                    ...TabHeader,
                    ...(i===viewIdx && TabHeaderActive),
                    width: `${100/props.views.length}%`
                }}>
                    <p>{v.header}</p>
                </div>
            ))
        }
        </div>
        <div style={TabContent}>
            { props.views[viewIdx].view }
        </div>
    </div>;
}

export default TabView;