import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export { default as MetricView } from './metricView';

export type Metric = {
    title: string
    value: number
    color: string
    icon: IconDefinition
}