import React, { useState, useRef, useEffect } from 'react';
import { BaseStyle, HeaderBar, HeaderTitle, GraphContainer, 
    MetricsContainer, Metric, MetricValue, MetricTitle 
} from './areaChart.css';
import { SelectionInput } 
    from '../../../app/components/selectionInput';
import * as d3 from 'd3';

type ACPObj = { xAxis: number, yAxis: number }
type AreaChartProps = { 
    title: string
    metrics?: {title: string, value:string}[]
    graphs?: { [id: number]: { name: string, graph: ACPObj[] }}
};

const dummyData = [
    { xAxis: 0, yAxis: 6 },
    { xAxis: 1, yAxis: 4 },
    { xAxis: 2, yAxis: 3 },
    { xAxis: 3, yAxis: 7 },
    { xAxis: 4, yAxis: 10 },
    { xAxis: 5, yAxis: 3 },
];

const dummyMetrics = [
    { title: "AVERAGE", value: "12 Mins" },
    { title: "MEDIAN",  value: "9 Mins" },
    { title: "EXAMPLE", value: "$12.00" }
];

const AreaChart: React.FunctionComponent<AreaChartProps> = (props) => {
    const [selectedGraph, setSelectedGraph] = useState<number>(0);
    const metrics = props.metrics? props.metrics: dummyMetrics;
    const chartRef = useRef<HTMLDivElement>(null);
    const options = props.graphs?Object.keys(props.graphs).map(k => ({
        s: props.graphs![+k].name, value: +k 
    })): [{s: "Test", value: 0}]

    useEffect(() =>  drawAreaChart(props.graphs?props.graphs[selectedGraph].graph:dummyData, chartRef));
    return <div style={BaseStyle}>
        <div style={HeaderBar}>
            <p style={HeaderTitle}>{props.title}</p>
            <div style={{position: 'absolute', right: '16px', top: '8px'}}>
                <SelectionInput<number> value={selectedGraph}  options={options}
                    onChange={(e: number) => setSelectedGraph(e)}/>
            </div>
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

export default AreaChart;

const drawAreaChart = (data: ACPObj[], ref: React.RefObject<HTMLDivElement>) => {
    if(!ref.current) return;
    ref.current.innerHTML = ''; 

    let margin = {top: 20, right: 30, bottom: 30, left: 50},
        width = 760 - margin.left - margin.right,
        height = 310 - margin.top - margin.bottom;
        
    const svg = d3.select(ref.current).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const max = d3.max(data, function(d) { return d.yAxis; })
    const extent = d3.extent(data, (d) => d.xAxis)
    console.log(extent)
    if( !max || extent[0] === undefined || 
        extent[1] === undefined ) 
            return;
    
    var x = d3.scaleLinear()
        .domain(extent)
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
        // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Add the area
    const area = d3.area<ACPObj>().x((d) => x(d.xAxis))
        .y0(y(0)).y1((d) => y(d.yAxis));

    svg.append("path")
        .datum(data)
        .attr("fill", "#cce5df")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", area);
};