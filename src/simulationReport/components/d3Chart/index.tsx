import D3Chart from './d3Chart'
export { default as drawAreaChart } from './areaChart'
export { default as drawDivergentBarPlot } from './divergentBarPlot'
export { default as drawBarPlot } from './barPlot'

export default D3Chart;

export type D3CObj = { xAxis: number, yAxis: number }

export type D3DrawFunc = (data: D3CObj[], ref: React.RefObject<HTMLDivElement>) => void;