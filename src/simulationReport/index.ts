import { MetricProp, GraphPropObj } from './components/d3Chart';
import { Metric } from './components/metricView';

export { default as SimulationReport } from './simulationReport';

export type CalculatedResults = {
    baseMetrics: Metric[]

    journeyTimesPredicted:          GraphPropObj
    journeyTimesExperienced:        GraphPropObj
    congestionPassengerLifetime:    GraphPropObj
    congestionVehicleLifetime:      GraphPropObj
    congestionStationDay:           GraphPropObj
    congestionVehicleDay:           GraphPropObj
    timeAtStopPassenger:            GraphPropObj
    timeAtStopVehicle:              GraphPropObj
}