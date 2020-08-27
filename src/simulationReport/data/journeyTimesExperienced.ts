import { SimulationResults } from '../../app/pkg/simulation';
import { GraphPropFunc, D3CObj } from '../components/d3Chart';
import { getTimeFromSeconds, getMedian, getAverage } from '.';
import { drawAreaChart, drawDivergentBarPlot, drawBarPlotVertical } 
    from '../components/d3Chart';

export const GetPassengerTotalExperienceJourneyTimeFunc = (results: SimulationResults): GraphPropFunc => () => {
    const graphData: D3CObj[] = [];
    const arr = Object.keys(results.passenger)
        .sort((a, b) => {
            if(results.passenger[+a].journeyTimes.tod < results.passenger[+b].journeyTimes.tod) return -1
            else if(results.passenger[+a].journeyTimes.tod > results.passenger[+b].journeyTimes.tod) return 1
            else return 0
        })
        .map((a) => { 
            graphData.push({yAxis: results.passenger[+a].journeyTimes.actual, xAxis: +a}); 
            return results.passenger[+a].journeyTimes.actual;
        });

    return {
        metrics: [
            {title: "AVERAGE", value: getTimeFromSeconds(getAverage(arr)).toString()}, 
            {title: "MEDIAN", value: getTimeFromSeconds(getMedian(arr)).toString()}
        ],
        graph: (ref: React.RefObject<HTMLDivElement>) => drawBarPlotVertical(graphData, ref)
    }
};