import { Reducer } from 'redux';
import { 
    Algorithms, 
    SimulationAction,
    SimulationState,
    SimulationActionTypes,
    Playspeeds
} from './constants';
import { TransitModes } 
    from '../../../leftPanel/components/componentView/constants';

export const initialState: SimulationState = {
    simClock: 0,
    playSpeedIdx: 4,
    algorithm: Algorithms.Dijkstra,
    
    isPlaying: false,
    isSimulating: false,
    isBaking: false,
    bakedFrames: {
        total: 45,
        current: 1
    },

    data: {
        frames:{
            0:{ 
                simulation: {
                    passengers: { 1: { coordinates: { x: 356, y:220 } }}, 
                    vehicles:   { 1: { coordinate:  { x: 657, y:109 }, angle: 20, passengerCnt: 3 }}, 
                    stations:   { 1: { passengerCnt: 4, passengerCntByRoute: { 1: 2, 2:2 } }},
                }, 
                evaluation: {} 
            },
            1:{ 
                simulation: {
                    passengers: { 1: { coordinates: { x: 456, y:320 } }}, 
                    vehicles:   { 1: { coordinate:  { x: 757, y:209 }, angle: 30, passengerCnt: 5 }}, 
                    stations:   { 1: { passengerCnt: 2, passengerCntByRoute: { 1: 1, 2:1 } }},
                }, 
                evaluation: {} 
            }
        },

        passengerPaths: {
            1: {
                [Algorithms.Dijkstra]: { 
                    isActive: true, 
                    path: [
                        {
                            isLast: true, route: 1, mode: TransitModes.FOOT, 
                            nodes:[
                                { coord: {x:50,  y:50},  isLast: false },
                                { coord: {x:150, y:150}, isLast: false },
                                { coord: {x:250, y:250}, isLast: false },
                                { coord: {x:350, y:350}, isLast: true  },
                            ]
                        }
                    ]
                }
            }
        }
    },

    options:{
        stopTime: 2,
        distanceMul: 10.0,
        mmLanguage: "",
        congestionInterval: 60,
        passengerCompliance: 100,
        modeSpeeds: {
            foot: 1.0,
            bus: 10.0,
            train: 15.0,
            tram: 12.5,
        }
    }
}


const SimulationReducer: Reducer<SimulationState, SimulationAction> = (state = initialState, action) => {
    switch(action.type) {
        case SimulationActionTypes.SET_IS_PLAYING:
            if(!action.payload) return state;
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
            if(!action.payload) return state;
            return action.payload.algorithm?{
                ...state,
                algorithm: action.payload.algorithm
            } : state;
        case SimulationActionTypes.SET_SIMULATION_FRAME:
            if(!action.payload) return state;
            return action.payload.simFrame?{
                ...state,
                simClock: action.payload.simFrame
            } : state;
        case SimulationActionTypes.INC_SIMULATION_FRAME:
            return !state.isPlaying? {
                ...state,
                simClock: state.simClock + 1
            } : state;
        case SimulationActionTypes.DEC_SIMULATION_FRAME:
            return !state.isPlaying? {
                ...state,
                simClock: state.simClock - 1
            } : state;
        case SimulationActionTypes.SET_SIMULATION_OPTS:
            console.log(action);
            if(!action.payload) return state;
            return action.payload.opts? {
                ...state,
                options: {
                    ...state.options,
                    ...action.payload.opts
                }
            } : state;
        case SimulationActionTypes.BAKE_SCENARIO:
            if(!action.payload) return state;
            return action.payload.isBaking? {
                ...state,
                isBaking: action.payload.isBaking,
                bakedFrames: {
                    ...state.bakedFrames,
                    total: 
                        action.payload.simFrame? 
                        action.payload.simFrame: 
                        state.bakedFrames.total
                }
            }: state;
        case SimulationActionTypes.SET_BAKED_FRAMES:
            if(!action.payload) return state;
            return action.payload.simFrame? {
                ...state,
                bakedFrames: {
                    ...state.bakedFrames,
                    current: action.payload.simFrame
                }
            }: state;
        case SimulationActionTypes.INC_BAKED_FRAMES:
            return state.isBaking? {
                ...state,
                bakedFrames: {
                    ...state.bakedFrames,
                    current: state.bakedFrames.current + 1
                }
            } : state;
        case SimulationActionTypes.DEC_BAKED_FRAMES:
            return state.isBaking? {
                ...state,
                bakedFrames: {
                    ...state.bakedFrames,
                    current: state.bakedFrames.current - 1
                }
            } : state;
        case SimulationActionTypes.PUSH_PASSENGER_PATHS:
            if(!action.payload) return state;
            return action.payload.pPath? {
                ...state,
                data: {
                    frames: { ...(state.data? state.data.frames:{}) },
                    passengerPaths: {
                        ...(state.data? state.data.passengerPaths:{}),
                        [action.payload.pPath.pID]: action.payload.pPath.path
                    },
                }
            }: state;
        case SimulationActionTypes.PUSH_BAKED_FRAME:
            if(!action.payload) return state;
            return action.payload.simFrame && 
                action.payload.dataFrame &&
                action.payload.evalFrame? {
                ...state,
                data: {
                    passengerPaths: {
                        ...(state.data? state.data.passengerPaths:{}),
                    },
                    frames: {
                        ...(state.data? state.data.frames:{}),
                        [action.payload.simFrame]: {
                            simulation: action.payload.dataFrame, 
                            evaluation: action.payload.evalFrame 
                        }
                    }
                }
            }: state;
        case SimulationActionTypes.CANCEL_BAKE:
            return {
                ...state,
                isBaking: false,
                isSimulating: false,
                data: null,
                bakedFrames: {
                    current: 0,
                    total: 0
                }
            };
        case SimulationActionTypes.COMPLETE_BAKE:
            if(!action.payload) return state;
            return {
                ...state,
                isBaking: false,
                isSimulating: true,
                data: {
                    frames: action.payload.frames? action.payload.frames: {},
                    passengerPaths: state.data?.passengerPaths? 
                        { passengerPaths: state.data.passengerPaths }:
                        {}
                }
            };
        case SimulationActionTypes.INIT_SIMULATION:
            console.log("Init Sim")
            return {
                ...state,
                isSimulating: true,
                isBaking: true,
                bakedFrames: {
                    current: 0,
                    total: (24*60*60)
                }
            };
        default:
            return state;
    }
}

export default SimulationReducer;