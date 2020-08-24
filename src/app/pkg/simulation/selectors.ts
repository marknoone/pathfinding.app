import Graph from "./graph";
import ActiveVehicle from "./vehicle";
import ActivePassenger from "./passenger";
import ActiveStation from "./station";
import { Scenario } from "../../../editor/constants";
import { getModeSpeedMap } from ".";
import { isPassenger, Passenger } 
    from "../../../editor/components/leftPanel/components/passengerView/constants";
import { TransitModes } from "../../../editor/components/leftPanel/components/componentView/constants";

export const getSimulationPassengers = (scenario: Scenario, g: Graph): ActivePassenger[] => {
    const { passengers, simulation }: Scenario = scenario;
    const modeSpdMap = getModeSpeedMap(simulation.options);
    let pID = 0, p = passengers.tree;
    let simulationPassengers: ActivePassenger[] = [];

    Object.keys(p).filter((k:String) => {
        const id = +k, passenger = p[id];
        if(!isPassenger(passenger)) return false;
        return true; 
    }).forEach((key:string) => {
        const passenger = p[+key] as Passenger;
        simulationPassengers[pID] = new ActivePassenger(
            pID, passenger, modeSpdMap[TransitModes.FOOT], g
        );
        pID += 1;
    });

    return simulationPassengers;
}

export const getSimulationVehicles = (scenario: Scenario, g: Graph): ActiveVehicle[] => {
    let vID = 0;
    let simulationVehicles: ActiveVehicle[] = [];
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
                modeSpdMap[route.mode],
                departure,
                scenario.simulation.options.stopTime
            );
            vID += 1;
        })
    });

    return simulationVehicles;
}

export const getStations = (scenario: Scenario, g: Graph): ActiveStation[] => {
    const { stations, routes } : Scenario = scenario;
    const stns: ActiveStation[] = Object.keys(stations.data).map((stnID:string) => {
        const stn = stations.data[+stnID];
        const stnNID = g.getNodeFromCoordinates(stn.coordinates)
        return new ActiveStation(stn.id, stn.coordinates, stnNID?stnNID:-1)
    });

    Object.keys(routes.data).forEach((r:string) => 
        Object.keys(routes.data[+r].stations).forEach((s:string) =>
            stns[routes.data[+r].stations[+s].id].addRouteWatch(routes.data[+r].id))
    );

    return stns;
}