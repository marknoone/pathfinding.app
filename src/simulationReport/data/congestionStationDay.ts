import { SimulationResults } from '../../app/pkg/simulation';
import { GraphPropFunc, D3CObj } from '../components/d3Chart';
import { getTimeFromSeconds, getMedian, getAverage } from '.';
import { drawAreaChart, drawDivergentBarPlot, drawBarPlotVertical } 
    from '../components/d3Chart';

export const GetTotalCongestionStationDayFunc = (results: SimulationResults): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.frame).map((fID:string) => {
        const v = Object.keys(results.frame[+fID].stationCongestion).reduce((accum, val) =>
            accum + results.frame[+fID].stationCongestion[+val], 0);
    
        vals.push(+v);
        return { xAxis: +fID, yAxis: v}
    });
    return {
        metrics: [
            {title: "AVERAGE", value: getTimeFromSeconds(getAverage(vals)).toString()}, 
            {title: "MEDIAN", value: getTimeFromSeconds(getMedian(vals)).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawAreaChart(graphData, ref)
    }
};

export const GetCongestionStationDayFunc = (results: SimulationResults, sID: number): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.frame).map((fID:string) => {
        const v = results.frame[+fID].stationCongestion[sID]? 
                    results.frame[+fID].stationCongestion[sID]:0;

        vals.push(v);
        return { xAxis: +fID, yAxis: v}
    });

    return {
        metrics: [
            {title: "AVERAGE", value: getTimeFromSeconds(getAverage(vals)).toString()}, 
            {title: "MEDIAN", value: getTimeFromSeconds(getMedian(vals)).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawAreaChart(graphData, ref)
    }
};