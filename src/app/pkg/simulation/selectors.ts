import Graph from "./graph";
import ActiveVehicle from "./vehicle";
import ActiveStation from "./station";
import ActivePassenger from "./passenger";
import { Scenario } from "../../../editor/constants";
import { getModeSpeedMap, StationContainer } from ".";
import { isPassenger, Passenger } 
    from "../../../editor/components/leftPanel/components/passengerView/constants";

export const getSimulationPassengers = (scenario: Scenario, g: Graph): ActivePassenger[] => {
    let pID = 0, p = scenario.passengers.tree;
    let simulationPassengers: ActivePassenger[] = [];

    Object.keys(p).filter((k:String) => {
        const id = +k, passenger = p[id];
        if(!isPassenger(passenger)) return false;
        return true; 
    }).forEach((key:string) => {
        const passenger = p[+key] as Passenger;
        const toNode = g.getNodeFromCoordinates(passenger.start);
        const fromNode = g.getNodeFromCoordinates(passenger.destination);
        simulationPassengers[pID] = new ActivePassenger(
            pID, 
            toNode? toNode: -1, 
            fromNode? fromNode: -1,
            passenger.tod
        );
        pID += 1;
    });

    return simulationPassengers;
}

export const getSimulationVehicles = (scenario: Scenario, g: Graph): ActiveVehicle[] => {
    let vID = 0;
    let simulationVehicles: ActiveVehicle[] = [];
    const { routes, simulation }: Scenario = scenario;
    const modeSpdMap = getModeSpeedMap(simulation.options);
    
    Object.keys(routes.data).forEach((k:string) => {
        const route = routes.data[+k];
        const deps = Object.keys(route.departures).sort();
        deps.forEach(d => {
            const departure = route.departures[+d].value;
            simulationVehicles[vID] = new ActiveVehicle(
                vID, route, 
                modeSpdMap[route.mode],
                departure,
                scenario.simulation.options.stopTime
            );
            vID += 1;
        })
    });

    return simulationVehicles;
}

export const getStations = (scenario: Scenario, g: Graph): StationContainer => {
    const { stations, routes } : Scenario = scenario;
    const stns: StationContainer = Object.keys(stations.data).reduce((accum, stnID) => {
        const stn = stations.data[+stnID];
        const stnNID = g.getNodeFromCoordinates(stn.coordinates)
        return {
            ...accum,
            [stn.id]: new ActiveStation(stn.id, stn.coordinates, stnNID?stnNID:-1)
        }
    }, {});

    Object.keys(routes.data).forEach((r:string) => {
        const route = routes.data[+r];
        Object.keys(route.stations).forEach((s:string) =>
            stns[route.stations[+s].id].addRoute(route.id))
    });

    return stns;
}