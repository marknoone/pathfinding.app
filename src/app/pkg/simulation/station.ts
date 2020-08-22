import { Queue } from "../queues";

class ActiveStation {
    stationQ: Queue<number>

    constructor(){
        this.stationQ = new Queue<number>();
    }

    
}

export default ActiveStation;