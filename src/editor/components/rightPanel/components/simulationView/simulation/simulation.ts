import { put } from 'redux-saga/effects';
import { Graph, Path } from ".";
import { SimulationActionTypes, Algorithms, FullSimData, CoordEvalFunc, SimulationOptions } from '../constants';
import { Passenger, isPassenger, PassengerState } from '../../../../leftPanel/components/passengerView/constants';
import { Route, Station } from '../../../../leftPanel/components/componentView/constants';
import { EvaluateMiddlewareFunc } from '../middlewares';

// Algorithms
import Dijkstra from '../algorithms/dijkstra';
import TD_Dijkstra from '../algorithms/td-dijkstra';
import MM_TD_Dijkstra from '../algorithms/mm-td-dijkstra';
import CMT_Dijkstra from '../algorithms/cmt-dijkstra';

const GetPath = ( start: number, dest: number, depTime: number, alg: Algorithms, g:Graph): Path => {
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

function* SimulateScenario( g: Graph, opts: SimulationOptions,  coordEvalFunc: CoordEvalFunc, middleware?: EvaluateMiddlewareFunc ) {
    // Main Simulation Loop...
    const DAY = 24 ;//* 60 * 60
    const simData: FullSimData = {frames: {}, passengerPaths: {}}

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
    for(let second = 0; second < DAY; second++){
        
        // Check for:
        // - Vehicle departures, push to vehicle stack if exists...
        // - Passenger departures, get path and push to passenger stack if exists...
        
        // Evaluate active vehicle and passegner stacks
        
        // Evaluate middlewares and push to simulationObj.
        
        yield delay(500)
        yield put({ 
            type: SimulationActionTypes.INC_BAKED_FRAMES
        })
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