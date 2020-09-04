import Graph from "./graph";
import ActiveVehicle from "./vehicle";
import ActivePassenger from "./passenger";
import ActiveStation from "./station";
import { Scenario } from "../../../editor/constants";
import { getModeSpeedMap } from ".";
import { isPassenger, Passenger } 
    from "../../../editor/components/leftPanel/components/passengerView/constants";
import { TransitModes } from "../../../editor/components/leftPanel/components/componentView/constants";

export const getSimulationPassengers = (scenario: Scenario, g: Graph): { [pID: number]: ActivePassenger } => {
    const { passengers, simulation }: Scenario = scenario;
    const modeSpdMap = getModeSpeedMap(simulation.options);
    let p = passengers.tree;
    let simulationPassengers:  { [pID: number]: ActivePassenger } = {};

    Object.keys(p).filter((k:String) => {
        const id = +k, passenger = p[id];
        if(!isPassenger(passenger)) return false;
        return true; 
    }).forEach((key:string) => {
        const passenger = p[+key] as Passenger;
        simulationPassengers[+key] = new ActivePassenger(
            +key, passenger, modeSpdMap[TransitModes.FOOT], g
        );
    });

    return simulationPassengers;
}

export const getSimulationVehicles = (scenario: Scenario, g: Graph):{ [vID: number]: ActiveVehicle } => {
    let vID = 0;
    let simulationVehicles: { [vID: number]: ActiveVehicle } = {};
    const { stations, routes, simulation }: Scenario = scenario;
    const modeSpdMap = getModeSpeedMap(simulation.options);
    
    Object.keys(routes.data).forEach((k:string) => {
        const route = routes.data[+k];
        const deps = Object.keys(route.departures).sort();
        deps.forEach(d => {
            const departure = route.departures[+d].value;
            const stns = Object.keys(route.stations).map(k => 
                stations.data[route.stations[+k].id]);
            simulationVehicles[vID] = new ActiveVehicle(
                vID, route, stns, 
                scenario.vehicles.data[route.vehicleID].capacity,
                modeSpdMap[route.mode],
                departure,
                scenario.simulation.options.stopTime
            );
            vID += 1;
        })
    });

    return simulationVehicles;
}

export const getStations = (scenario: Scenario, g: Graph): { [sID: number]: ActiveStation } => {
    const { stations, routes } : Scenario = scenario;
    const stns: { [sID: number]: ActiveStation } = {};
    Object.keys(stations.data).forEach((stnID:string) => {
        const stn = stations.data[+stnID];
        const stnNID = g.getNodeFromCoordinates(stn.coordinates)
        stns[stn.id] = new ActiveStation(stn.id, stn.coordinates, stnNID?stnNID:-1)
    });
    return stns;
}