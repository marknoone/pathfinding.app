export type SimulationAction = {
    type: string
    payload: {
        isPlaying?: boolean
        simFrame?: number
        algorithm?: Algorithms
        playSpeed?: Playspeed
    }
}

export type SimulationState = {
    isPlaying: boolean
    simFrame: number
    algorithm: Algorithms
    playSpeed: Playspeed
}

export enum SimulationActionTypes {
    SET_SIMULATION_ALGORITHM = "@@simulation/SET_SIMULATION_ALGORITHM",
    SET_SIMULATION_FRAME = "@@simulation/SET_SIMULATION_ALGORITHM",
    SET_PLAY_SPEED = "@@simulation/SET_PLAY_SPEED",
    SET_IS_PLAYING = "@@simulation/SET_IS_PLAYING"
}

export enum Algorithms {
    Dijkstra = 0,
    TimeDependentDijkstra = 1,
    MultiModalTimeDependentDijkstra = 2,
    CMTDijkstra = 3
}

export type Playspeed = -32 | -16 | -4 | -2 | 1 | 2 | 4 | 16 | 32 