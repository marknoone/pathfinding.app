import { 
    Algorithms,
    SimulationState,
    SimulationActionTypes,
    SimulationAction,
    Playspeed
} from './constants';

export const SetSimulationAlgorithm = (alg: Algorithms):SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_ALGORITHM,
    payload: {algorithm: alg}
})

export const SetSimulationFrame = (frame: number):SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_FRAME,
    payload: {simFrame: frame}
})

export const SetPlaySpeed = (spd: Playspeed):SimulationAction => ({
    type: SimulationActionTypes.SET_PLAY_SPEED,
    payload: {playSpeed: spd}
})

export const SetToolbarCollapse = (val: boolean):SimulationAction => ({
    type: SimulationActionTypes.SET_IS_PLAYING                  ,
    payload: {isPlaying: val}
})