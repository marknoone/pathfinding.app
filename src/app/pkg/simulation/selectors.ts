import Graph from "./graph";
import { getModeSpeedMap } from ".";
import ActiveVehicle from "./vehicle";
import ActivePassenger from "./passenger";
import { Scenario } from "../../../editor/constants";
import { isPassenger, Passenger, PassengerTree } 
    from "../../../editor/components/leftPanel/components/passengerView/constants";

export const getSimulationPassengers = (p: PassengerTree, g: Graph): ActivePassenger[] => {
    let pID = 0;
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

export const getSimulationVehicles = (scenario: Scenario): ActiveVehicle[] => {
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
                departure
            );
            vID += 1;
        })
    });

    return simulationVehicles;
}