import { CalculatedResults } from '..';
import _ from 'lodash';
import { SimulationResults } from '../../app/pkg/simulation';
import { faBus, faFlag, faUserFriends, faRunning, faExchangeAlt } 
    from '@fortawesome/free-solid-svg-icons';

// Graph data methods ...
import { GetPassengerTotalPredictedJourneyTimeFunc } from './journeyTimesPredicted';
import { GetPassengerTotalExperienceJourneyTimeFunc } from './journeyTimesExperienced';
import { GetTimeAtStopVehicleFunc, GetTotalTimeAtStopVehicleFunc } from './timeAtStopVehicle';
import { GetCongestionStationDayFunc, GetTotalCongestionStationDayFunc } from './congestionStationDay';
import { GetCongestionVehicleDayFunc, GetTotalCongestionVehicleDayFunc } from './congestionVehicleDay';
import { GetCongestionVehicleLifetimeFunc, GetTotalCongestionVehicleLifetimeFunc } from './congestionVehicleLifetime';
import { GetCongestionPassengerLifetimeFunc, GetTotalCongestionPassengerLifetimeFunc } from './congestionPassengerLifetime';
import { GetPredictedTimeAtStopPassengerFunc, GetTotalPredictedTimeAtStopPassengerFunc } from './predictedTimeAtStopPassenger';
import { GetExperiencedTimeAtStopPassengerFunc, GetTotalExperiencedTimeAtStopPassengerFunc } from './experiencedTimeAtStopPassenger';

export const NullGraphObj = {
    metrics: [{title: "", value: ""}],
    graph: (ref: React.RefObject<HTMLDivElement>) => {} 
}

export const getAverage = (arr: number[]) => (arr.reduce((a, b) => a + b) / arr.length);
export const getMedian = (arr: number[]) => {
    const mid = Math.floor(arr.length / 2), nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export const getTimeFromSeconds = (s:number):string =>
    `${
        Math.floor(s/60/60)<10?"0"+Math.floor(s/60/60):Math.floor(s/60/60)
    }:${
        Math.floor((s/60)%60)<10?"0"+Math.floor((s/60)%60):Math.floor((s/60)%60)
    }:${
        Math.floor(s % 60)<10?"0"+Math.floor(s%60):Math.floor(s%60)
    } (${s.toFixed(2)})`;

export const getCalculatedResults = (results: SimulationResults): CalculatedResults => {
    const journeytimesPredicted = 
        { 0: { name: "Total Journey Times", Get: GetPassengerTotalPredictedJourneyTimeFunc(results) } };
    
    const journeytimesExpected = 
        { 0: { name: "Total Journey Times", Get: GetPassengerTotalExperienceJourneyTimeFunc(results) } };
    
    const congestionPassengerLifetime = Object.keys(results.passenger).reduce((accum, pKey) => (
        { ...accum, [+pKey]: { name: `Passenger-${pKey}`, Get: GetCongestionPassengerLifetimeFunc(results, +pKey) }}
    ), { 0: { name: "Total Journey Times", Get: GetTotalCongestionPassengerLifetimeFunc(results) } });
    
    // Journey Times Expected
    const congestionVehicleLifetime = Object.keys(results.vehicles).reduce((accum, pKey) => (
        { ...accum, [+pKey]: { name: `Vehicle-${pKey}`, Get: GetCongestionVehicleLifetimeFunc(results, +pKey) }}
    ), { 0: { name: "Total Journey Times", Get: GetTotalCongestionVehicleLifetimeFunc(results) } });
    
    // Journey Times Expected
    const congestionStationDay = _.range(1, results.metrics.stationTotal, 1).reduce((accum, pKey) => (
        { ...accum, [+pKey]: { name: `Station-${pKey}`, Get: GetCongestionStationDayFunc(results, +pKey) }}
    ), { 0: { name: "Total Journey Times", Get: GetTotalCongestionStationDayFunc(results) } });
   
    // Journey Times Expected
    const congestionVehicleDay = Object.keys(results.vehicles).reduce((accum, pKey) => (
        { ...accum, [+pKey]: { name: `Vehicle-${pKey}`, Get: GetCongestionVehicleDayFunc(results, +pKey) }}
    ), { 0: { name: "Total Journey Times", Get: GetTotalCongestionVehicleDayFunc(results) } });
    
    // Journey Times Expected
    const timeAtStopPassenger = Object.keys(results.passenger).reduce((accum, pKey) => (
        { ...accum, [+pKey]: { name: `Passenger-${pKey}`, Get: GetExperiencedTimeAtStopPassengerFunc(results, +pKey) }}
    ), { 0: { name: "Total Journey Times", Get: GetTotalExperiencedTimeAtStopPassengerFunc(results) } });
    
    // Journey Times Expected
    const timeAtStopVehicle = Object.keys(results.vehicles).reduce((accum, pKey) => (
        { ...accum, [+pKey]: { name: `Vehicle-${pKey}`, Get: GetTimeAtStopVehicleFunc(results, +pKey) }}
    ), { 0: { name: "Total Journey Times", Get: GetTotalTimeAtStopVehicleFunc(results) } });


    return ({
        baseMetrics: [
            { title: "# of Vehicles",            color: '#6c5ce7', value: results.metrics.vehicleTotal,       icon: faBus         },
            { title: "# of Stations",            color: '#fdcb6e', value: results.metrics.stationTotal,       icon: faFlag        },
            { title: "# of Passengers/Trips",    color: '#e17055', value: results.metrics.passengerTotal,     icon: faUserFriends },
            { title: "# of Passengers Missed",   color: '#00cec9', value: results.metrics.passengerTransfers, icon: faRunning     },
            { title: "# of Passenger Transfers", color: '#00b894', value: results.metrics.missedPassengers,   icon: faExchangeAlt },
        ],

        journeyTimesPredicted:          journeytimesPredicted,
        journeyTimesExperienced:        journeytimesExpected,
        congestionPassengerLifetime:    congestionPassengerLifetime,
        congestionVehicleLifetime:      congestionVehicleLifetime,
        congestionStationDay:           congestionStationDay,
        congestionVehicleDay:           congestionVehicleDay,
        timeAtStopPassenger:            timeAtStopPassenger,
        timeAtStopVehicle:              timeAtStopVehicle,
    });

};