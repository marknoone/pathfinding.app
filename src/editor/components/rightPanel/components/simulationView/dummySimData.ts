import { Algorithms } from './constants';
import { SimulationResults, FullSimData, EmptyPath } from '../../../../../app/pkg/simulation';
import { TransitModes } from '../../../leftPanel/components/componentView/constants'; 


export const DummySimData: FullSimData = {
    frames:{
        0:{
            passengers: { 1: { coordinates: { x: 356, y:220 } }}, 
            vehicles:   { 1: { coordinate:  { x: 657, y:109 }, originalVID: 1, angle: 20, passengerCnt: 3 }}, 
            stations:   { 1: { passengerCnt: 4 }},
        },
        1:{
            passengers: { 1: { coordinates: { x: 456, y:320 } }}, 
            vehicles:   { 1: { coordinate:  { x: 757, y:209 }, originalVID: 1, angle: 30, passengerCnt: 5 }}, 
            stations:   { 1: { passengerCnt: 2 }},
        }
    },
    passengerPaths: {
        1: {
            [Algorithms.Dijkstra]: { 
                isActive: true, 
                path: {
                    ...EmptyPath,
                    data: [
                        {
                            isLast: true, route: 1, mode: TransitModes.FOOT, 
                            nodes:[
                                { coord: {x:50,  y:50},  nID: 0, isLast: false },
                                { coord: {x:150, y:150}, nID: 1, isLast: false },
                                { coord: {x:250, y:250}, nID: 2, isLast: false },
                                { coord: {x:350, y:350}, nID: 3, isLast: true  },
                            ]
                        }
                    ]
                }
            }
        }
    }
}



export const DummySimulationResults: SimulationResults = {
    frames: { start: 0, end: 6 },
    metrics:{
        vehicleTotal: 3,
        passengerTotal: 5,
        stationTotal: 4,
        passengerTransfers: 12,
        missedPassengers: 1,
    },

    passenger: {
        1: {
            timeWaiting: { predicted: [[1, 34]], actual: [[1, 54]], tod: 14*60*60 }, 
            journeyTimes: { predicted: 124, actual: 178, tod: 14*60*60  },
        },
        2: {
            timeWaiting: { predicted: [[1, 12]], actual: [[1, 36]], tod: 13*60*60 }, 
            journeyTimes: { predicted: 87, actual: 124, tod: 13*60*60  },
        },
        3: {
            timeWaiting: { predicted: [[1, 67]], actual: [[1, 98]], tod: 18*60*60 }, 
            journeyTimes: { predicted: 346, actual: 387, tod: 18*60*60  },
        },
        4: {
            timeWaiting: { predicted: [[1, 128]], actual: [[1, 456]], tod: 9*60*60 }, 
            journeyTimes: { predicted: 234, actual: 564, tod: 9*60*60  },
        },
        5: {
            timeWaiting: { predicted: [[1, 55]], actual: [[1, 76]], tod: 11*60*60 }, 
            journeyTimes: { predicted: 186, actual: 237, tod: 11*60*60  },
        }
    },
    
    vehicles: {
        1 :  [ [1, 12],  [3, 6],  [2, 2],  [4, 24]  ], 
        2 :  [ [3, 24],  [1, 6],  [2, 36],  [4, 18] ], 
        3 :  [ [4, 2],  [2, 6],  [1, 2],  [3, 8]    ], 
    },

    frame: {
        1: {
            stationCongestion: { 1: (1), 2: (4), 3: (3), 4: (0) },
            vehicleCongestion: { 1: (0), 2: (1), 3: (2) },
            passengerCongestion: { 1: (1), 2: (0), 3: (3), 4: (2), 5: (2) }
        },
        2: {
            stationCongestion: { 1: (0), 2: (4), 3: (4), 4: (0) },
            vehicleCongestion: { 1: (0), 2: (1), 3: (2) },
            passengerCongestion: { 1: (1), 2: (0), 3: (3), 4: (0), 5: (2) }
        },
        3: {
            stationCongestion: { 1: (0), 2: (4), 3: (0), 4: (1) },
            vehicleCongestion: { 1: (0), 2: (2), 3: (2) },
            passengerCongestion: { 1: (2), 2: (1), 3: (3), 4: (0), 5: (3) }
        },
        4: {
            stationCongestion: { 1: (1), 2: (0), 3: (0), 4: (1) },
            vehicleCongestion: { 1: (1), 2: (2), 3: (2) },
            passengerCongestion: { 1: (2), 2: (1), 3: (3), 4: (0), 5: (3) }
        },
        5: {
            stationCongestion: { 1: (1), 2: (0), 3: (0), 4: (0) },
            vehicleCongestion: { 1: (1), 2: (3), 3: (2) },
            passengerCongestion: { 1: (1), 2: (1), 3: (1), 4: (1), 5: (3) }
        },
        6: {
            stationCongestion: { 1: (2), 2: (0), 3: (1), 4: (0) },
            vehicleCongestion: { 1: (1), 2: (3), 3: (3) },
            passengerCongestion: { 1: (1), 2: (1), 3: (1), 4: (1), 5: (3) }
        }
    }
}