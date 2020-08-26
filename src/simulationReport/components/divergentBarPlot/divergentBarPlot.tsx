import React, { useState, useRef, useEffect } from 'react';
import { BaseStyle, HeaderBar, HeaderTitle, GraphContainer, 
    MetricsContainer, Metric, MetricValue, MetricTitle 
} from './divergentBarPlot.css';
import { SelectionInput } 
    from '../../../app/components/selectionInput';
import * as d3 from 'd3';
import './chart.css';

type DBPObj = { xAxis: number, yAxis: number }
type DivergentBarPlotProps = { 
    title: string
    metrics?: {title: string, value:string}[]
    graphs?: { [id: number]: { name: string, graph: DBPObj[] }}
};
const dummyData = [
    { xAxis: 0, yAxis: -6 },
    { xAxis: 1, yAxis: 4 },
    { xAxis: 2, yAxis: 3 },
    { xAxis: 3, yAxis: 7 },
    { xAxis: 4, yAxis: -10 },
    { xAxis: 5, yAxis: 3 },
];

const dummyMetrics = [
    { title: "AVERAGE", value: "12 Mins" },
    { title: "MEDIAN",  value: "9 Mins" },
    { title: "EXAMPLE", value: "$12.00" }
];

const DivergentBarPlot: React.FunctionComponent<DivergentBarPlotProps> = (props) => {
    const [selectedGraph, setSelectedGraph] = useState<number>(0);
    const metrics = props.metrics? props.metrics: dummyMetrics;
    const chartRef = useRef<HTMLDivElement>(null);
    const options = props.graphs?Object.keys(props.graphs).map(k => ({
        s: props.graphs![+k].name, value: +k 
    })): [{s: "Test", value: 0}]

    useEffect(() =>  drawBarChart(props.graphs?props.graphs[selectedGraph].graph:dummyData, chartRef));
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

export default DivergentBarPlot;

const drawBarChart = (data: DBPObj[], ref: React.RefObject<HTMLDivElement>) => {
    let margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 760 - margin.left - margin.right,
    height = 310 - margin.top - margin.bottom;
    
    const svg = d3.select(ref.current).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const max = d3.max(data, function(d) { return d.xAxis; })
    const extentY = d3.extent(data, (d) => d.yAxis )
    if(!max || !extentY[0] || !extentY[1]) return;
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain(extentY)
        .nice();
    
    
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.xAxis.toString() ))
        .round(true)
        .padding(.2);
    
    
    const xAxisScale = d3.scaleLinear()
        .domain([0, max])
        .range([ 0, width]);
    
    const xAxis = d3.axisBottom(xAxisScale)
        .tickFormat(d3.format("d"));
    
    const yAxis = d3.axisLeft(y);

    
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", (d) => d.yAxis < 0? "bar negative":"bar positive")
        .attr("data-yr", (d) => d.xAxis )
        .attr("data-c", (d) =>  d.yAxis )
        .attr("title", (d) => d.xAxis + ": " + d.yAxis)
        .attr("y", (d) => d.yAxis > 0? y(d.yAxis):y(0))
        .attr("x", (d) => x(d.xAxis.toString())! )
        .attr("width", x.bandwidth())
        .attr("height", (d) => Math.abs(y(d.yAxis) - y(0)))
        .on("mouseover", (d) => {
                d3.select("#_yr")
                    .text("Passenger: " + d.xAxis);
                d3.select("#degrree")
                    .text(d.yAxis + "°C");
        });
    
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    
        svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .text("°Celsius")
            .attr("transform", "translate(15, 40), rotate(-90)")
    
        svg.append("g")
            .attr("class", "X axis")
            .attr("transform", "translate(" + (margin.left - 6.5) + "," + height + ")")
            .call(xAxis);
    
        svg.append("g")
            .attr("class", "x axis")
            .append("line")
            .attr("y1", y(0))
            .attr("y2", y(0))
            .attr("x2", width);
    
        svg.append("g")
            .attr("class", "infowin")
            .attr("transform", "translate(50, 5)")
            .append("text")
            .attr("id", "_yr");
    
        svg.append("g")
            .attr("class", "infowin")
            .attr("transform", "translate(110, 5)")
            .append("text")
            .attr("id","degrree");

}