import { 
    Algorithms,
    SimulationState,
    SimulationActionTypes,
    SimulationAction
} from './constants';

export const SetSimulationAlgorithm = (alg: Algorithms):SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_ALGORITHM,
    payload: {algorithm: alg}
})

export const SetSimulationFrame = (frame: number):SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_FRAME,
    payload: {simFrame: frame}
})

export const IncSimulationFrame = ():SimulationAction => ({
    type: SimulationActionTypes.INC_SIMULATION_FRAME,
    payload: {}
})

export const DecSimulationFrame = ():SimulationAction => ({
    type: SimulationActionTypes.DEC_SIMULATION_FRAME,
    payload: {}
})

export const IncPlaySpeed = ():SimulationAction => ({
    type: SimulationActionTypes.INC_PLAY_SPEED,
    payload: {}
})

export const DecPlaySpeed = ():SimulationAction => ({
    type: SimulationActionTypes.DEC_PLAY_SPEED,
    payload: {}
})

export const SetIsPlaying = (val: boolean):SimulationAction => ({
    type: SimulationActionTypes.SET_IS_PLAYING                  ,
    payload: {isPlaying: val}
})