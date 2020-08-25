import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBug } from '@fortawesome/free-solid-svg-icons';
import { GetSimulationResults } from '../app/pkg/simulation';
import { 
    ReportBaseStyle, ReportErrContainer, BugIcon,
    DesktopIcon, ErrTitle, ErrDesc
} from './simulationReport.css';

const useQuery = () => new URLSearchParams(useLocation().search);
const NoReportSelected = React.memo((props) => 
    <div style={ReportBaseStyle}>
        <div style={ReportErrContainer}>
            <div style={BugIcon}><FontAwesomeIcon icon={faBug} /></div>
            <div style={DesktopIcon}><FontAwesomeIcon icon={faDesktop} /></div>
            <p style={ErrTitle}>No Report Found!</p>
            <p style={ErrDesc}>
                Either the specified project ID is incorrect or it's simulation results cannot be found. 
                Please re-run your simulation.
            </p>
        </div>
    </div>
);

const SimulationReport: React.FunctionComponent = (props) => {
    const query = useQuery();
    const projectID = query.get("proj"), scenarioID = query.get("scenario");
    if(!projectID || !scenarioID) return <NoReportSelected />;
    const results = GetSimulationResults(projectID, scenarioID);
    if(!results) return <NoReportSelected />;

    return (
        <div style={{}}>
            projID
        </div>
    );
};

export default SimulationReport;


