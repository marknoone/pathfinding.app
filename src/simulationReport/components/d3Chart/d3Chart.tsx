import React, { useState, useRef, useMemo, useEffect } from 'react';
import { BaseStyle, HeaderBar, HeaderTitle, GraphContainer, 
    MetricsContainer, Metric, MetricValue, MetricTitle }
    from './d3Chart.css';
import { SelectionInput } 
    from '../../../app/components/selectionInput';
import './chart.css'


type D3ChartProps = { 
    title: string
    
    metrics: { 
        title: string, 
        value:string 
    }[]

    graphs: { 
        [id: number]: { 
            name: string, 
            draw: (ref: React.RefObject<HTMLDivElement>) => void 
        }
    }
};

const D3Chart: React.FunctionComponent<D3ChartProps> = ({title, graphs, metrics}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [selectedGraph, setSelectedGraph] = useState<number>(0);
    const options = useMemo( () => Object.keys(graphs).map(k => ({
        s: graphs[+k].name, value: +k 
    })), []);

    useEffect(() => {
        graphs[selectedGraph].draw(chartRef);
    }, [chartRef, selectedGraph]);

    return <div style={BaseStyle}>
        <div style={HeaderBar}>
            <p style={HeaderTitle}>{title}</p>
            {
                options.length <= 0? null:
                <div style={{position: 'absolute', right: '16px', top: '8px'}}>
                    <SelectionInput<number> value={selectedGraph}  options={options}
                        onChange={(e: number) => {
                            if(chartRef.current)
                                chartRef.current.innerHTML = '';
                            setSelectedGraph(e)
                        }}/>
                </div>
            }
        </div>
        <div style={GraphContainer}>
            <div ref={chartRef}></div>
        </div>
        <div style={MetricsContainer}>
            <ul style={{
                margin: 0, 
                padding: 0, 
                listStyle: 'none', 
                width: '100%',
                height: '100%',
                borderTop: '1px solid #ccc'
            }}>
            {
                metrics.map((m, i) =>(
                    <li style={{
                        ...Metric, 
                        width: `${100/metrics.length}%`,
                        ...( i !== metrics.length-1 && { borderRight: '1px solid #ddd'})
                    }}>
                        <p style={MetricTitle}>{m.title}</p>
                        <p style={MetricValue}>{m.value}</p>
                    </li>
                ))
            }
            </ul>
        </div>
    </div>;
}

export default D3Chart;