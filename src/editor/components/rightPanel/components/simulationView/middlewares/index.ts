// export { default as ExampleMiddleware } from './example';

import { SimulationFrame } from "../constants";

export type EvaluationData = {[middlewareKey: string]: any}
export type EvaluationFunc = (f: SimulationFrame) => any
export type MiddlewareObj = { [middlewareKey:string] : EvaluationFunc }
export type EvaluateMiddlewareFunc = (f: SimulationFrame) => EvaluationData

const withMiddleware = (obj: MiddlewareObj): EvaluateMiddlewareFunc => 
    (f: SimulationFrame) => {
        var result: {[middlewareKey: string]: any} = {};
        Object.keys(obj).forEach((k:string) => {
            const evalFunc = obj[k]
            result[k] = evalFunc(f);
        })
        return result;
}

export default withMiddleware;