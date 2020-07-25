import { Reducer } from 'redux';
import { 
    Algorithms, 
    SimulationAction,
    SimulationState,
    SimulationActionTypes,
    Playspeed,
} from './constants';

export const initialState = {
    isPlaying: false,
    simFrame: 0,
    algorithm: Algorithms.Dijkstra,
    playSpeed: 1 as Playspeed
}


const SimulationReducer: Reducer<SimulationState, SimulationAction> = (state = initialState, action) => {
    switch(action.type) {
        case SimulationActionTypes.SET_IS_PLAYING:
            return action.payload.isPlaying? {
                ...state,
                isPlaying: action.payload.isPlaying
            } : state;
        case SimulationActionTypes.SET_PLAY_SPEED:
            return action.payload.playSpeed?{
                ...state,
                playSpeed: action.payload.playSpeed as Playspeed
            } : state;
        case SimulationActionTypes.SET_SIMULATION_ALGORITHM:
            return action.payload.algorithm?{
                ...state,
                algorithm: action.payload.algorithm
            } : state;
        case SimulationActionTypes.SET_SIMULATION_FRAME:
            return action.payload.simFrame?{
                ...state,
                simFrame: action.payload.simFrame
            } : state;
        default:
            return state;
    }
}

export default SimulationReducer;