import { ProjectSummary, ProjectData } from '../../store/project/constants';
import _ from 'lodash';


const PROJECTS_ROOT_STORE_KEY = "APP_PROJECTS";
type RootStorage = {
    nextProjectID: number,
    projects: ProjectSummary[]
}

interface ProjectStore {
    AddNewProject:(name: string) => ProjectSummary | null
    DeleteProjectByID: (idx:number) => void
    GetProjectSummaries: () => ProjectSummary[]
    GetProjectID: (projectName:string) => number
    SetProjectNameByID: (id:number, to:string) => void
    SetProjectLastEditByID: (id:number, to:number) => void
    GetProjectDataByID: (idx:number) => (ProjectData | null)
    SaveProjectByID: (idx:number, project:ProjectData) => void
}

export class LocalStorage implements ProjectStore {

    constructor(){
        let rs = this.getRootStore();
        if(!rs){
            this.saveRootStore({
                nextProjectID: 1,
                projects: []
            })
        }
    }

    private formatProjectKey (n:number):string {
        return `PROJECT-${n}`;
    }

    private saveRootStore (r: RootStorage):void {
        try {
            const serializedState = JSON.stringify(r);
            localStorage.setItem(PROJECTS_ROOT_STORE_KEY, serializedState);
        } catch(err) {
            console.log(err);
        }
    }

    private getRootStore():(RootStorage| null) {
        try {
            const serializedSummaryState = localStorage.getItem(PROJECTS_ROOT_STORE_KEY);
            if(serializedSummaryState){
                const p =  JSON.parse(serializedSummaryState) as RootStorage;
                return p;
            } else {
                return null;
            }
                
        } catch(err) {
            console.log(err)
            return null;
        }
    }

    GetProjectSummaries ():ProjectSummary[] { 
        let root = this.getRootStore();
        if(root){
            return root.projects;
        } else {
            return [];
        }
    }

    GetProjectID (projectName:string):number { 
        let root = this.getRootStore();
        if(root){
            const project = root.projects.find((p:ProjectSummary) => p.name === projectName);
            if(project)
                return project.id
            else 
                return -1
        } else {
            return -1
        }
    }
    
    GetProjectDataByID (idx:number):(ProjectData | null) { 
        try {
            const serializedProject = localStorage.getItem(this.formatProjectKey(idx));
            if(serializedProject){
                const p =  JSON.parse(serializedProject) as ProjectData;
                return p
            } else {
                return null;
            }
                
        } catch(err) {
            console.log(err)
            return null;
        }
    }
    
    SaveProjectByID (id:number, project:ProjectData):void {
        try {
            const serializedState = JSON.stringify(project);
            localStorage.setItem(this.formatProjectKey(id), serializedState);
        } catch(err) {
            console.log(err);
        }
    }
    
    SetProjectNameByID(id:number, to:string):void { 
        let root = this.getRootStore();
        if(root){
            let pIdx = root.projects.findIndex((p:ProjectSummary) => p.id === id);
            if(pIdx >= 0) {
                root.projects[pIdx] = { ...root.projects[pIdx], name: to };
                this.saveRootStore({...root});
            }
        }
    }
    
    SetProjectLastEditByID(id:number, to:number):void { 
        let root = this.getRootStore();
        if(root){
            let pIdx = root.projects.findIndex((p:ProjectSummary) => p.id === id);
            if(pIdx >= 0) {
                root.projects[pIdx] = { ...root.projects[pIdx], lastEdited: to };
                this.saveRootStore({...root});
            }
        }
    }
    
    DeleteProjectByID(idx:number): void {
        const root = this.getRootStore();
        if (root){
            const del = root.projects.find((p:ProjectSummary) => p.id === idx);
            if(del){
                const newProjects = root.projects.filter((p:ProjectSummary) => p.id !== idx);
                try {
                    localStorage.removeItem(this.formatProjectKey(idx));
                    this.saveRootStore({...root, projects: newProjects});
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
    
    AddNewProject(name: string):ProjectSummary | null {
        const root = this.getRootStore();
        if(root){
            const obj = {id: root.nextProjectID, name: name, lastEdited: Date.now()}
            this.saveRootStore({nextProjectID: root.nextProjectID+1, projects: [
                ...root.projects, obj
            ]})
            return obj;
        }
    
        return null
    }
}


export const DefaultLocalStorage = new LocalStorage();