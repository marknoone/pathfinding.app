import { SimulationResults } from '../../app/pkg/simulation';
import { GraphPropFunc } from '../components/d3Chart';
import { getMedian, getAverage } from '.';
import { drawAreaChart, drawDivergentBarPlot } 
    from '../components/d3Chart';

export const GetTotalCongestionPassengerLifetimeFunc = (results: SimulationResults): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.frame).map((fID:string) => {
        const v = Object.keys(results.frame[+fID].passengerCongestion).reduce((accum, pID) =>
            accum + results.frame[+fID].passengerCongestion[+pID], 0) /
            Object.keys(results.frame[+fID].passengerCongestion).length;
    
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
    
export const GetCongestionPassengerLifetimeFunc = (results: SimulationResults, pID: number): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.frame).map((fID:string) => {
        const v = results.frame[+fID].passengerCongestion[pID]? 
                    results.frame[+fID].passengerCongestion[pID]:0;

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