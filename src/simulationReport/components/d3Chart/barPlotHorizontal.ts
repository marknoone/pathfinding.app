import React from 'react';
import { D3DrawFunc, D3CObj } from ".";
import * as d3 from 'd3';

const drawBarPlotHorizontal: D3DrawFunc = (data: D3CObj[], ref: React.RefObject<HTMLDivElement>) => {
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

    const maxY = d3.max(data, (d) => d.yAxis )
    const maxX = d3.max(data, (d) => d.xAxis)
    if( !maxY || !maxX ) 
            return;

    var x = d3.scaleLinear()
        .domain([0, maxX ])
        .range([ 3, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
        .domain(data.map((d) => d.yAxis.toString() ))
        .range([ 0, height ])
        .padding(.05);
    svg.append("g")
        .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", (d) => y(d.yAxis.toString())! )
        .attr("width", (d) => x(d.xAxis) )
        .attr("height", y.bandwidth() )
        .attr("fill", "#69b3a2")
}

export default drawBarPlotHorizontal;