export type SimulationAction = {
    type: string
    payload: {
        isPlaying?: boolean
        simFrame?: number
        algorithm?: Algorithms
    }
}

export type SimulationState = {
    isPlaying: boolean
    simFrame: number
    algorithm: Algorithms
    playSpeedIdx: number
}

export enum SimulationActionTypes {
    SET_SIMULATION_ALGORITHM = "@@simulation/SET_SIMULATION_ALGORITHM",
    SET_SIMULATION_FRAME = "@@simulation/SET_SIMULATION_ALGORITHM",
    INC_SIMULATION_FRAME = "@@simulation/INC_SIMULATION_FRAME",
    DEC_SIMULATION_FRAME = "@@simulation/DEC_SIMULATION_FRAME",
    INC_PLAY_SPEED = "@@simulation/INC_PLAY_SPEED",
    DEC_PLAY_SPEED = "@@simulation/DEC_PLAY_SPEED",
    SET_IS_PLAYING = "@@simulation/SET_IS_PLAYING"
}

export enum Algorithms {
    Dijkstra = 1,
    TimeDependentDijkstra = 2,
    MultiModalTimeDependentDijkstra = 3,
    CMTDijkstra = 4
}

export const Playspeeds = [-32, -16, -4, -2, 1, 2, 4, 16, 32];