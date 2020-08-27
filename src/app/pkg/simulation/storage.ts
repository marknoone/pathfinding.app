import { SimulationResults } from '.';

const getProjectStorageKey = (projID:string, scenarioID: string) =>
    `__RESULTS__PROJ=${projID}&SCEN=${scenarioID}`;

export const GetSimulationResults = (projID:string, scenarioID: string)
    :(SimulationResults | null) => {
        try {
            const serializedProject = localStorage.getItem(getProjectStorageKey(projID, scenarioID));
            if(serializedProject){
                const p =  JSON.parse(serializedProject) as SimulationResults;
                return p
            } else {
                return null;
            }
                
        } catch(err) {
            console.log(err)
            return null;
        }
}

export const SaveSimulationResults = 
    (s: SimulationResults, projID:string, scenarioID: string) => {
        try {
            const serializedState = JSON.stringify(s);
            localStorage.setItem(getProjectStorageKey(projID, scenarioID), serializedState);
        } catch(err) {
            console.log(err);
        }
}