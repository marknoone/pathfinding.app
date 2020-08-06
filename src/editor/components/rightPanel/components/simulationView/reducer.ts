import { Reducer } from 'redux';
import { 
    Algorithms, 
    SimulationAction,
    SimulationState,
    SimulationActionTypes,
    Playspeeds
} from './constants';

export const initialState = {
    isPlaying: false,
    simFrame: 0,
    algorithm: Algorithms.Dijkstra,
    playSpeedIdx: 4
}

const SimulationReducer: Reducer<SimulationState, SimulationAction> = (state = initialState, action) => {
    switch(action.type) {
        case SimulationActionTypes.SET_IS_PLAYING:
            return action.payload.isPlaying !== undefined? {
                ...state,
                isPlaying: action.payload.isPlaying
            } : state;
        case SimulationActionTypes.INC_PLAY_SPEED:
            const newSpdIdx = state.playSpeedIdx + 1
            return newSpdIdx >= 0 && 
                newSpdIdx < Playspeeds.length?{
                    ...state,
                    playSpeedIdx: newSpdIdx
            } : state;
        case SimulationActionTypes.DEC_PLAY_SPEED:
            const newSpeedIdx = state.playSpeedIdx - 1
            return newSpeedIdx >= 0 && 
                newSpeedIdx < Playspeeds.length?{
                    ...state,
                    playSpeedIdx: newSpeedIdx
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
        case SimulationActionTypes.INC_SIMULATION_FRAME:
            return !state.isPlaying? {
                ...state,
                simFrame: state.simFrame + 1
            } : state;
        case SimulationActionTypes.DEC_SIMULATION_FRAME:
            return !state.isPlaying? {
                ...state,
                simFrame: state.simFrame - 1
            } : state;
        default:
            return state;
    }
}

export default SimulationReducer;