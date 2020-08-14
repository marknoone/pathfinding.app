import { 
    Algorithms,
    SimulationActionTypes,
    SimulationAction
} from './constants';

export const SimulateScenario = ():SimulationAction => ({
    type: SimulationActionTypes.SIMULATE_SCENARIO
})

export const BakeScenario = ():SimulationAction => ({
    type: SimulationActionTypes.BAKE_SCENARIO
})

export const IncSimulationFrame = ():SimulationAction => ({
    type: SimulationActionTypes.INC_SIMULATION_FRAME
})

export const DecSimulationFrame = ():SimulationAction => ({
    type: SimulationActionTypes.DEC_SIMULATION_FRAME
})

export const IncPlaySpeed = ():SimulationAction => ({
    type: SimulationActionTypes.INC_PLAY_SPEED
})

export const DecPlaySpeed = ():SimulationAction => ({
    type: SimulationActionTypes.DEC_PLAY_SPEED
})

export const SetSimulationFrame = (frame: number):SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_FRAME,
    payload: {simFrame: frame}
})

export const SetIsPlaying = (val: boolean):SimulationAction => ({
    type: SimulationActionTypes.SET_IS_PLAYING                  ,
    payload: {isPlaying: val}
})

export const SetSimulationAlgorithm = (alg: Algorithms):SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_ALGORITHM,
    payload: {algorithm: alg}
})