import React from 'react';
import { D3DrawFunc, D3CObj } from ".";
import * as d3 from 'd3';

const drawDivergentBarChart: D3DrawFunc = (data: D3CObj[], ref: React.RefObject<HTMLDivElement>) => {
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
        .attr("height", (d) => Math.abs(y(d.yAxis) - y(0)));
    
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    
        svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .text("Difference")
            .attr("transform", "translate(15, 50), rotate(-90)")
    
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

export default drawDivergentBarChart;