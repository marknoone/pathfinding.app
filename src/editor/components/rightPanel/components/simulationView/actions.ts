import { SimulationOptions } from '../../../../../app/pkg/simulation';
import {  Algorithms, SimulationActionTypes, SimulationAction } from './constants';

export const SimulateScenario = ():SimulationAction => ({
    type: SimulationActionTypes.SIMULATE_SCENARIO
})

export const SetBakeScenario = (isBaking:boolean, totalFrames?: number):SimulationAction => ({
    type: SimulationActionTypes.BAKE_SCENARIO,
    payload: {isBaking: isBaking, simFrame: totalFrames}
})

export const CancelBaking = ():SimulationAction => ({
    type: SimulationActionTypes.CANCEL_BAKE
})

export const SetBakedFrames = (bakedFrames: number):SimulationAction => ({
    type: SimulationActionTypes.BAKE_SCENARIO,
    payload: {simFrame: bakedFrames}
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

export const SetSimOptions = (opts: SimulationOptions): SimulationAction => ({
    type: SimulationActionTypes.SET_SIMULATION_OPTS,
    payload: {opts: opts}
})