import { put } from 'redux-saga/effects';
import { Graph, Path, ActiveVehicle, ActivePassenger } from ".";
import { SimulationActionTypes, Algorithms, FullSimData, CoordEvalFunc, SimulationOptions, SimulationAction, SimulationFrame } from '../constants';
import { Passenger, isPassenger, PassengerState, PassengerTree } from '../../../../leftPanel/components/passengerView/constants';
import { Route, Station, VehicleDataObj, Vehicle, TransitModes, RouteDataObj } from '../../../../leftPanel/components/componentView/constants';
import { EvaluateMiddlewareFunc } from '../middlewares';
import { Scenario } from '../../../../../constants';
import { Queue } from '../../../../../../app/pkg/queues';

// Algorithms
import Dijkstra from '../algorithms/dijkstra';
import TD_Dijkstra from '../algorithms/td-dijkstra';
import MM_TD_Dijkstra from '../algorithms/mm-td-dijkstra';
import CMT_Dijkstra from '../algorithms/cmt-dijkstra';

const getPassengerPath = ( start: number, dest: number, depTime: number, alg: Algorithms, g:Graph): Path => {
    switch(alg) {
        case Algorithms.Dijkstra: 
            return new Dijkstra(g).Execute(start, dest, depTime);
        case Algorithms.TimeDependentDijkstra: 
            return new TD_Dijkstra(g).Execute(start, dest, depTime);
        case Algorithms.MultiModalTimeDependentDijkstra: 
            return new MM_TD_Dijkstra(g).Execute(start, dest, depTime);
        case Algorithms.CMTDijkstra: 
            return new CMT_Dijkstra(g).Execute(start, dest, depTime);
        default: 
            return [];
    }
}

const getDepartingPassengers = (t: PassengerTree, timeSecs: number): Passenger[] => {
    return Object.keys(t).filter((k:String) => {
        const id = +k, passenger = t[id];
        if(!isPassenger(passenger)) return false;
        if(passenger.tod !== timeSecs) return false;
        return true; 
    }).map((key:string) => t[+key]) as Passenger[];
}

const getDepartingVehiclesClojure = () => {
    var vID = 0;
    return (scenario: Scenario, timeSecs: number): ActiveVehicle[] => {
        const { vehicles, stations, routes, ...rest}: Scenario = scenario;
        return Object.keys(routes.data).filter((k:string) => {
            const id = +k, route = routes.data[id];
            return Object.keys(route.departures).find((d:string) => {
                const dep = route.departures[+d];
                if(dep.value === timeSecs) return true;
                return false;
            }) !== undefined;
        }).map((k:string) => {
            vID += 1;
            return {
                ID: vID,
                vehicleID: routes.data[+k].vehicleID,
                routeID: routes.data[+k].id,
                destStation: routes.data[+k].stations[0].id,
                activatedOn: timeSecs,
                lastStatusChg: timeSecs,
                status: "STOPPED",
                passengerCnt: 0,

                coords: stations.data[routes.data[+k].stations[0].id].coordinates,
                alightingPassengers: new Queue()
            }
        });
    }
}


type StationQueues = {[routeID: number]: { [stationID:number]: Queue<number>}};
const getRouteStationQueues = (data: RouteDataObj):StationQueues => {
    return Object.keys(data).reduce((mainAccum, r) => {

        const routeStationQueues = Object.keys(data[+r].stations).reduce((accum, k) => {
            const stn = data[+r].stations[+k];
            return { ...accum, [stn.id] : new Queue<number>() }
        },  {});

        return { ...mainAccum, [data[+r].id]: routeStationQueues }
    }, {});
}

function* SimulateScenario(g: Graph, scenario: Scenario,  coordEvalFunc: CoordEvalFunc, middleware?: EvaluateMiddlewareFunc ) {
    const DAY = 24 * 60 * 60;
    const simData: FullSimData = {frames: {}, passengerPaths: {}}
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const { simulation, passengers, vehicles, stations, routes, ...rest} = scenario;
    const stationQueues: StationQueues = getRouteStationQueues(routes.data); 
    const getDepartingVehicles = getDepartingVehiclesClojure();

    // Simulation objects
    const activeVehicles = new Set<ActiveVehicle>();
    const activePassengers = new Set<ActivePassenger>();
    
    for(let second = 0; second < DAY; second++){
        // 1. Check for Passenger departures, get path and push to passenger set if exists...
        const simulationFrame: SimulationFrame = {passengers: {}, stations: {}, vehicles: {}};
        const departingPassengers = getDepartingPassengers(passengers.tree, second);
        const departingActivePassengers: ActivePassenger[] = departingPassengers.map((p:Passenger) => {
            const startNodeID = coordEvalFunc(p.start), destNodeID = coordEvalFunc(p.destination);
            if(startNodeID && destNodeID){
                const path = getPassengerPath(startNodeID, destNodeID, second, simulation.algorithm, g);
                return {
                    currentMode: TransitModes.FOOT,
                    currentVehicle: null,
                    lastStatusChg: second,
                    status: "NOTREADY",
    
                    path: path,
                    destNode: path[0].nodeIDs[0],
                    coords: p.start
                }
            } else 
                return null
        }).filter(apCand => apCand===null?false:true) as ActivePassenger[];
        departingActivePassengers.forEach( dap => activePassengers.add(dap))
        
        // 2. Check for Vehicle departures, push to vehicle set if exists...
        const departingVehicles = getDepartingVehicles(scenario, second);
        departingVehicles.forEach( dv => activeVehicles.add(dv));

        // 3. Evaluate active vehicle and passenger stacks
        activeVehicles.forEach((av:ActiveVehicle) => {
            // const angle = ;
            // const coordinate = ;

            simulationFrame.vehicles = {
                ...simulationFrame.vehicles,
                [av.ID]: {
                    ...simulationFrame.vehicles[av.ID],
                    [second]: {
                        angle: 0, 
                        passengerCnt: av.passengerCnt, 
                        coordinate: {x:0, y:0}
                    }
                }
            }
        });
        
        // 4. Evaluate middlewares and push to simulationObj.
        
        // 5. Push simulation frame to store & update UI if needed.
        const frameAction: SimulationAction = { 
            type: SimulationActionTypes.PUSH_BAKED_FRAME,
            payload: {simFrame: second, dataFrame: simulationFrame, evalFrame: {}}
        };

        yield put(frameAction);
        if(second%1000 === 0)
            yield put({ type: SimulationActionTypes.INC_BAKED_FRAMES }) // TODO: Set baked frames...
    }
    return null;
}

function CheckForVehicleDepartures(){}
// function CheckForPassengerDepartures(passengers: PassengerState){
//     const activePassengers =  Object.keys(passengers.tree)
//         .filter((key:string) => isPassenger(passengers.tree[+key]))
//         .map((key: string) => {
//             const p = passengers.tree[+key] as Passenger;
//             const startNodeID = findNodeWithCoordinates(graph, canvas.boxSize, canvas.canvasSize, p.start); 
//             const destNodeID = findNodeWithCoordinates(graph, canvas.boxSize, canvas.canvasSize, p.destination); 
//             if(!startNodeID || !destNodeID) return {}
//             return {
//                 currentMode: null,
//                 currentVehicle: null,
//                 lastStatusChg: 0,
//                 status: "NOTREADY",
            
//                 destNode: p.destination,
//                 coords: {x: 0, y: 0},
//                 path: GetPath(startNodeID, destNodeID, p.tod, simulation.algorithm, graph),
//             }
//         })
//         console.log(activePassengers);
// }

function EvaluateVehicleStack(){}
function EvaluatePassengerStack(){}

export default SimulateScenario;