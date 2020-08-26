import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBug } from '@fortawesome/free-solid-svg-icons';
import { GetSimulationResults } from '../app/pkg/simulation';
import { DivergentBarPlot } from './components/divergentBarPlot';
import { MetricView } from './components/metricView';
import { AreaChart } from './components/areaChart';
import { TableView } from './components/tableView';
import { 
    // Normal styles...
    BaseStyle, DataContainer, MetricContainer, GraphContainer,
    TableContainer, LIElem,

    // Err Styles..
    ReportErrBaseStyle, ReportErrContainer, BugIcon,
    DesktopIcon, ErrTitle, ErrDesc
} from './simulationReport.css';

const useQuery = () => new URLSearchParams(useLocation().search);
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

const SimulationReport: React.FunctionComponent = (props) => {
    const query = useQuery();
    const projectID = query.get("proj"), scenarioID = query.get("scenario");
    if(!projectID || !scenarioID) return <NoReportSelected />;
    const results = GetSimulationResults(projectID, scenarioID);
    // if(!results) return <NoReportSelected />;

    return (
        <div style={BaseStyle}>
            <p style={{
                width: '100%', padding: '10px 20vw 30px 20vw',
                fontSize: '20px', fontWeight: 500, fontFamily: "'Montserrat', sans-serif",
                color: '#464646', margin: 0
            }}>Simulation Results: <span style={{textDecoration: 'italic'}}>{"Untitled Project"}</span>, Scenario: <span>{1}</span></p>
            <div style={DataContainer}> 
                <div style={MetricContainer}><MetricView metrics={[
                    {title: "Example 1", color: '#e17055', value: 200, icon: faDesktop},
                    {title: "Example 2", color: '#6c5ce7', value: 200, icon: faDesktop},
                    {title: "Example 3", color: '#fdcb6e', value: 200, icon: faDesktop},
                    {title: "Example 4", color: '#00cec9', value: 200, icon: faDesktop},
                    {title: "Example 5", color: '#00b894', value: 200, icon: faDesktop},
                ]}/></div>
                <ul style={{margin: '25px 0px', padding: 0, listStyle: 'none', width: '100%'}}>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><DivergentBarPlot title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><DivergentBarPlot title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><DivergentBarPlot title="Example"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Example"/></div>
                    </li>
                </ul>
                <div style={TableContainer}><TableView /></div>
            </div>
        </div>
    );
};

export default SimulationReport;


