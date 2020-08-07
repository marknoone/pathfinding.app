import { AppState } from "../../../../store";

export const saveToLocalStore = (name: string, state: AppState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(name, serializedState);
    } catch(err) {
        throw err;
    }
}

export const renameProjectInLocalStore = (from:string, to: string): void => {
    console.log("Renaming local store...")
    console.log(from)
    console.log(to)
    var f;
    try {
        f = loadProjectFromLocalStore(from);
    } catch(err) { console.log(err); }

    console.log(f)
    if(f) {
        try {
            saveToLocalStore(to, f);
        } catch(err) { console.log(err); }
    }
}

export const loadProjectFromLocalStore = (name:string): AppState | undefined => {
    try {
        const serializedState = localStorage.getItem(name);
        if(serializedState)
            return JSON.parse(serializedState) as AppState;
            console.log(serializedState)
    } catch(err) {
        throw err;
    }

    return undefined
};



