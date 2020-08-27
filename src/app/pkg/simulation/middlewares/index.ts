// export { default as ExampleMiddleware } from './example';

import { SimulationFrame } from "../";
import EventManager from "../events";

export { default as PassengerTransferMiddleware } from './passengerTransfers';
export { default as MissedPassengerMiddleware } from './missedPassenger';

export type EvaluationData = {[middlewareKey: string]: any}
export type EvaluationFunc = (f: SimulationFrame, e:EventManager) => any
export type MiddlewareObj = { [middlewareKey:string] : EvaluationFunc }
export type EvaluateMiddlewareFunc = (f: SimulationFrame, e:EventManager) => EvaluationData

const withMiddleware = (obj: MiddlewareObj): EvaluateMiddlewareFunc => 
    (f: SimulationFrame, e:EventManager) => {
        var result: {[middlewareKey: string]: any} = {};
        Object.keys(obj).forEach((k:string) => {
            const evalFunc = obj[k]
            result[k] = evalFunc(f, e);
        })
        return result;
}

export default withMiddleware;