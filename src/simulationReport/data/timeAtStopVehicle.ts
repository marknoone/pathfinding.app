import { SimulationResults } from '../../app/pkg/simulation';
import { GraphPropFunc } from '../components/d3Chart';
import { getTimeFromSeconds, getMedian, getAverage, NullGraphObj } from '.';
import { drawDivergentBarPlot, drawBarPlotVertical } 
    from '../components/d3Chart';

export const GetTotalTimeAtStopVehicleFunc = (results: SimulationResults): GraphPropFunc => () => {
    const vals: number[] = [];
    const graphData = Object.keys(results.vehicles).map((vID:string) => {
        const vAvg = 
            results.vehicles[+vID].reduce( (accum: number, b:number[]) => accum + b[1], 0 ) / 
            results.vehicles[+vID].length;

        vals.push(vAvg);
        return { xAxis: +vID, yAxis: vAvg }
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

export const GetTimeAtStopVehicleFunc = (results: SimulationResults, vID: number): GraphPropFunc => () => {
    if(!results.vehicles[vID]) return NullGraphObj;

    const vals: number[] = [];
    const graphData = 
        results.vehicles[vID].map((elem: number[]) => {
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
    