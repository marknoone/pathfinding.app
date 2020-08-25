import React, { useRef, useEffect } from 'react';
import { BaseStyle } from './areaChart.css';
import * as d3 from 'd3';

type ACPObj = { xAxis: number, yAxis: number }
type AreaChartProps = { data: ACPObj[] };
const AreaChart: React.FunctionComponent<AreaChartProps> = (props) => {
    const chartRef = useRef<HTMLDivElement>(null);
    useEffect(() =>  drawAreaChart(props.data, chartRef));
    return <div ref={chartRef}></div>;
}

export default AreaChart;

const drawAreaChart = (data: ACPObj[], ref: React.RefObject<HTMLDivElement>) => {
    let margin = {top: 10, right: 30, bottom: 30, left: 50},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        
    const svg = d3.select(ref.current).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const max = d3.max(data, function(d) { return d.yAxis; })
    const extent = d3.extent(data, (d) => d.xAxis)
    if(!max || !extent[0] || !extent[1]) return;

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