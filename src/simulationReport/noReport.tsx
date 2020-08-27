import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBug } from '@fortawesome/free-solid-svg-icons';
import { 
    ReportErrBaseStyle, ReportErrContainer, BugIcon,
    DesktopIcon, ErrTitle, ErrDesc
} from './simulationReport.css';

const NoReportSelected = React.memo((props) => 
    <div style={ReportErrBaseStyle}>
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

export default NoReportSelected;