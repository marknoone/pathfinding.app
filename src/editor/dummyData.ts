import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { Passenger } from './components/leftPanel/components/passengerView/constants';
import { TransitModes, Colours, StationDataObj, RouteDataObj, VehicleDataObj } 
    from './components/leftPanel/components/componentView/constants';

export const dummyStnDataObj: StationDataObj = {
    1:{ id: 1, name: "Station-1", isLocked: false, coordinates: {x: 400, y: 400}},
    2:{ id: 2, name: "Station-2", isLocked: false, coordinates: {x: 500, y: 500}},
    3:{ id: 3, name: "Station-3", isLocked: false, coordinates: {x: 600, y: 600}}
}

export const dummyRouterDataObj: RouteDataObj = {
    1:{ 
        id: 1, name: "Route-1", vehicleID: 1, isLocked: false, mode: TransitModes.BUS, 
        color: Colours.AMOUR, stations: {}, departures: {} 
    },
    2:{ 
        id: 2, name: "Route-2", vehicleID: 1, isLocked: false, mode: TransitModes.BUS, 
        color: Colours.AMOUR, stations: {}, departures: {} 
    },
    3:{ 
        id: 3, name: "Route-3", vehicleID: 1, isLocked: false, mode: TransitModes.BUS, color: Colours.AMOUR, 
        stations: { 1: {id: 1, name: 'Station-1'}, 2: {id: 2, name: 'Station-2'}, 3: {id: 3, name: 'Station-3'}}, 
        departures: {} 
    }
}

export const dummyVehicleDataObj: VehicleDataObj = {
    1:{ 
        id: 1, name: "Vehicle-1", isLocked: false, capacity: 6, glyph: faArchive, 
        LOS: { A: 0, B: 1, C:2, D:3, E:4, F:5 }
    },
    2:{ 
        id: 2, name: "Vehicle-2", isLocked: false, capacity: 6, glyph: faArchive, 
        LOS: { A: 0, B: 1, C:2, D:3, E:4, F:5 }
    },
}

export const dummyPassenger: Passenger = {
    id: 1, 
    name: "Passenger", 
    tod: 400, 
    start: {x: 380, y: 380}, 
    destination: {x: 580, y: 580},
    isLocked: false
}