// export { default as ExampleMiddleware } from './example';

import { SimulationFrame } from "../";
import EventManager from "../events";

export { default as PassengerTransferMiddleware } from './passengerTransfers';
export { default as MissedPassengerMiddleware } from './missedPassenger';


export type EvaluationFunc = (f: SimulationFrame, e:EventManager) => void