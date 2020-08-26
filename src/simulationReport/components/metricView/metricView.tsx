import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type Metric = {
    title: string
    value: number
    color: string
    icon: IconDefinition
}

type MVProps = { metrics: Metric[] }
const MetricView: React.FunctionComponent<MVProps> = (props) => {
    return <div style={{width: '100%', height: '100%'}}>
        <ul style={{
            margin: 0, 
            padding: '10px 10px', 
            listStyle: 'none', 
            width: '100%',
            height: '100%'
        }}>
            {
                props.metrics.map((m: Metric, idx:number) => (
                    <li style={{
                        position: 'relative',
                        display: 'inline-block',
                        height: '100%',
                        width: `${100/props.metrics.length}%`,
                        textAlign: 'center',
                        ...( idx !== props.metrics.length-1 && {borderRight: '1px solid #ddd'})
                    }}>
                        <div style={{
                            color: "white",
                            borderRadius: '50%',
                            marginTop: '20px',
                            paddingTop: '24px',
                            fontSize: '48px',
                            width: '124px',
                            height: '124px',
                            margin: 'auto',
                            backgroundColor: m.color
                        }}>
                            <FontAwesomeIcon icon={m.icon} />
                        </div>
                        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center'}}>
                            <p style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "24px",
                                fontWeight: 600,
                                color: '#464646',
                                margin: 0
                            }}>{m.value}</p>
                            <p style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: '#999'
                            }}>{m.title}</p>
                        </div>
                    </li>   
                ))
            }
        </ul>
    </div>;
}

export default MetricView;