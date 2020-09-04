import { Middleware } from 'redux';
const SimulationTimerMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
}

export default SimulationTimerMiddleware;