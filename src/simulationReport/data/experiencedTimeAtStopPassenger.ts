import { SimulationResults } from '../../app/pkg/simulation';
import { GraphPropFunc, D3CObj } from '../components/d3Chart';
import { getTimeFromSeconds, getMedian, getAverage, NullGraphObj } from '.';
import { drawDivergentBarPlot, drawBarPlotVertical } 
    from '../components/d3Chart';

export const GetTotalExperiencedTimeAtStopPassengerFunc = (results: SimulationResults): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.passenger).map((pID:string) => {
        const pAvg = 
            (results.passenger[+pID].timeWaiting.actual.reduce( (accum: number, b:number[]) => accum + b[1], 0 )) / 
            results.passenger[+pID].timeWaiting.actual.length;

        vals.push(pAvg);
        return { xAxis: +pID, yAxis: pAvg }
    });

    const totalAvg = getAverage(vals);
    graphData.forEach((elem) => elem.yAxis -= totalAvg);

    return {
        metrics: [
            {title: "AVERAGE", value: getTimeFromSeconds(totalAvg).toString()}, 
            {title: "MEDIAN", value: getTimeFromSeconds(getMedian(vals)).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawDivergentBarPlot(graphData, ref)
    }
};

export const GetExperiencedTimeAtStopPassengerFunc = (results: SimulationResults, pID: number): GraphPropFunc => () => {
    if(!results.passenger[pID]) return NullGraphObj;

    const vals: number[] = [];
    const graphData = 
        results.passenger[pID].timeWaiting.actual.map((elem: number[]) => {
            vals.push(elem[1]);
            return { xAxis: elem[0], yAxis: elem[1] }
    });

    return {
        metrics: [
            {title: "AVERAGE", value: getTimeFromSeconds(getAverage(vals)).toString()}, 
            {title: "MEDIAN", value: getTimeFromSeconds(getMedian(vals)).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawBarPlotVertical(graphData, ref)
    }
};