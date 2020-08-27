import { SimulationResults } from '../../app/pkg/simulation';
import { GraphPropFunc, D3CObj } from '../components/d3Chart';
import { getTimeFromSeconds, getMedian, getAverage } from '.';
import { drawAreaChart, drawDivergentBarPlot, drawBarPlotVertical } 
    from '../components/d3Chart';

export const GetTotalCongestionVehicleLifetimeFunc = (results: SimulationResults): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.frame).map((fID:string) => {
        const v = Object.keys(results.frame[+fID].vehicleCongestion).reduce((accum, vID) =>
            accum + results.frame[+fID].vehicleCongestion[+vID], 0) /
            Object.keys(results.frame[+fID].vehicleCongestion).length;
    
        vals.push(v);
        return { xAxis: +fID, yAxis: v}
    });

    const totalAvg = getAverage(vals);
    graphData.forEach((elem) => elem.yAxis -= totalAvg);
    return {
        metrics: [
            {title: "AVERAGE", value: totalAvg.toFixed(2).toString()}, 
            {title: "MEDIAN", value: getMedian(vals).toFixed(2).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawDivergentBarPlot(graphData, ref)
    }
};

export const GetCongestionVehicleLifetimeFunc = (results: SimulationResults, vID: number): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.frame).map((fID:string) => {
        const v = results.frame[+fID].passengerCongestion[vID]? 
                    results.frame[+fID].passengerCongestion[vID]:0;

        vals.push(v);
        return { xAxis: +fID, yAxis: v}
    });

    return {
        metrics: [
            {title: "AVERAGE", value: getAverage(vals).toFixed(2).toString()}, 
            {title: "MEDIAN", value: getMedian(vals).toFixed(2).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawAreaChart(graphData, ref)
    }
};