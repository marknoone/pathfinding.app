import D3Chart from './d3Chart'
export { default as drawAreaChart } from './areaChart'
export { default as drawDivergentBarPlot } from './divergentBarPlot'
export { default as drawBarPlotVertical } from './barPlotVertical'
export { default as drawBarPlotHorizontal } from './barPlotHorizontal'

export default D3Chart;

export type D3CObj = { xAxis: number, yAxis: number }

export type D3DrawFunc = (data: D3CObj[], ref: React.RefObject<HTMLDivElement>) => void;

export type MetricProp = { 
    title: string, 
    value:string 
}

export type GraphPropObj = {  
    [id: number]: {
        name: string, 
        Get: GraphPropFunc 
    }
}
export type GraphPropFunc = () => { 
    metrics: MetricProp[],
    graph: (ref: React.RefObject<HTMLDivElement>) => void 
}
