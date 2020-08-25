import React from 'react';
import { BaseStyle } from './simulationReport.css';
import { useLocation } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);
const SimulationReport: React.FunctionComponent = (props) => {
    const query = useQuery();
    const projID = query.get("proj");
    const scenarioID = query.get("scenario");

    return projID && scenarioID?
        <div style={BaseStyle}>
            
        </div>
        :null;
};

export default SimulationReport;


