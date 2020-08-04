import { Reducer } from 'redux';
import _ from 'lodash';
import { PassengerState, PassengerAction, PassengerActionTypes, PassengerDirectory, isPassengerDirectory, isPassenger } from './constants';

const initialState: PassengerState = {
    nextId: 1,
    tree: {
        0 : {
            id: 0,
            name: "All Passenger Trips",
            children: [],
        }
    }
}

const PassengerReducer: Reducer<PassengerState, PassengerAction> = (state = initialState, action) => {
    switch(action.type) {
        case PassengerActionTypes.UPDATE_PASSENGER_WITH_ID:
            if(!action.payload.item)
                return state;

            const updatePassengerWithIDItem = action.payload.item
            return isPassenger(updatePassengerWithIDItem)?{
                ...state,
                tree: {
                    ...state.tree,
                    [action.payload.id]: action.payload.item
                }
            }: state;
        case PassengerActionTypes.ADD_PASSENGER_TO_DIRECTORY:
            if(!action.payload.item)
                return state;
                
            const pass = action.payload.item;
            const d = state.tree[action.payload.id];
            return isPassengerDirectory(d) && isPassenger(pass)?{
                nextId: state.nextId+1,
                tree: {
                    ...state.tree,
                    [d.id]:{
                        ...state.tree[d.id],
                        children: [
                            ...d.children,
                            state.nextId
                        ],
                    },
                    [state.nextId]: {
                        id: state.nextId,
                        name: pass.name,
                        tod: pass.tod,
                        start: pass.start,
                        destination: pass.destination,
                    }
                }
            }: state;
        case PassengerActionTypes.ADD_EMPTY_PASSENGER_TO_DIRECTORY:
            const dir = state.tree[action.payload.id];
            return isPassengerDirectory(dir) && action.payload.item?{
                nextId: state.nextId+1,
                tree: {
                    ...state.tree,
                    [dir.id]:{
                        ...state.tree[dir.id],
                        children: [
                            ...dir.children,
                            state.nextId
                        ],
                    },
                    [state.nextId]: {
                        id: state.nextId,
                        name: `Passenger-${state.nextId}`,
                        tod: 0,
                        start: {x: 0, y: 0},
                        destination: {x: 0, y: 0},
                    }
                }
            }: state;
        case PassengerActionTypes.DELETE_PASSENGER_FROM_SCENARIO:
            const {[action.payload.id]:p, ...r} = state.tree;
            return {
                ...state,
                tree: r
            }
        case PassengerActionTypes.UPDATE_DIRECTORY_WITH_ID:
            if(!action.payload.item)
                return state;

            const updateDirectoryWithIDItem = action.payload.item
            return isPassengerDirectory(updateDirectoryWithIDItem)?{
                ...state,
                tree: {
                    ...state.tree,
                    [action.payload.id]: action.payload.item
                }
            }: state;
        case PassengerActionTypes.ADD_EMPTY_DIRECTORY_TO_DIRECTORY:
            if(!action.payload.item)
                return state;

            const empDirToDir = action.payload.item;
            return isPassengerDirectory(empDirToDir)?{
                nextId: state.nextId+1,
                tree: {
                    ...state.tree,
                    [state.nextId]: {
                        id: state.nextId,
                        name: `Directory-${state.nextId}`,
                        children: []
                    }
                }
            }: state;
        case PassengerActionTypes.ADD_DIRECTORY_TO_DIRECTORY:
            if(!action.payload.item)
                return state;

            const dirToDir = action.payload.item;
            return isPassengerDirectory(dirToDir)?{
                nextId: state.nextId+1,
                tree: {
                    ...state.tree,
                    [state.nextId]: {
                        id: state.nextId,
                        name: dirToDir.name,
                        children: dirToDir.children
                    }
                }
            }: state;
        case PassengerActionTypes.DELETE_DIRECTORY_FROM_SCENARIO:
            var children: number[] = [];
            const findChildren = (id: number) => {
                const obj = state.tree[id];
                if(isPassengerDirectory(obj))
                    obj.children.forEach( n => findChildren(n) )
                
                children.push(id);
            }
            
            findChildren(action.payload.id);
            return {
                ...state,
                tree: _.omit(state.tree, children)
            }
        default:
            return state;
    }
}

export default PassengerReducer;