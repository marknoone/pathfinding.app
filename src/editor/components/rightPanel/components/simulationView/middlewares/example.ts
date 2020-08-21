import { EvaluationFunc } from ".";
import { SimulationFrame } from "../constants";

const ExampleMiddleware: EvaluationFunc = () => {
    var i = 0;
    return (f: SimulationFrame) => {
        i++;
        return {frame: i}
    }
}

export default ExampleMiddleware;