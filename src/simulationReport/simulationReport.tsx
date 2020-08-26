import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBug, faBus, faFlag, faUserFriends, faExchangeAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import { GetSimulationResults } from '../app/pkg/simulation';
import { DivergentBarPlot } from './components/divergentBarPlot';
import { MetricView } from './components/metricView';
import { AreaChart } from './components/areaChart';
import { TableView } from './components/tableView';
import { 
    // Normal styles...
    BaseStyle, DataContainer, MetricContainer, GraphContainer, LIElem,

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

type TableRow = {
    Name: string,     
    Calories: number, 
    Protein: number,
    Carbs: number, 
    Fat: number,  
};

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
                    {title: "# of Vehicles", color: '#6c5ce7', value: 200, icon: faBus},
                    {title: "# of Stations", color: '#fdcb6e', value: 200, icon: faFlag},
                    {title: "# of Passengers/Trips", color: '#e17055', value: 200, icon: faUserFriends},
                    {title: "# of Passengers Missed", color: '#00cec9', value: 200, icon: faRunning},
                    {title: "# of Passenger Transfers", color: '#00b894', value: 200, icon: faExchangeAlt},
                ]}/></div>
                <ul style={{margin: '25px 0px', padding: 0, listStyle: 'none', width: '100%'}}>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><DivergentBarPlot title="Journey Times Predicted (over Day)"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Passenger Congestion (over Lifetime)"/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><DivergentBarPlot title="Journey Times Experienced (over Day)"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Vehicle Congestion (over Lifetime)"/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Station Congestion (over Day)"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Vehicle Congestion (over Day)"/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Time At Stop (Passenger/Day)"/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><AreaChart title="Time At Stop (Vehicle/Day)"/></div>
                    </li>
                </ul>
                <div style={{width: '100%', marginBottom: '64px'}}>
                    <TableView<TableRow> rows={[
                        { Name: 'Frozen yoghurt',     Calories: 159, Fat: 6.0,  Carbs: 24, Protein: 4.0 },
                        { Name: 'Ice cream sandwich', Calories: 237, Fat: 9.0,  Carbs: 37, Protein: 4.3 },
                        { Name: 'Eclair',             Calories: 262, Fat: 16.0, Carbs: 24, Protein: 6.0 },
                        { Name: 'Cupcake',            Calories: 305, Fat: 3.7,  Carbs: 67, Protein: 4.3 },
                        { Name: 'Gingerbread',        Calories: 356, Fat: 16.0, Carbs: 49, Protein: 3.9 },
                        { Name: 'Frozen yoghurt',     Calories: 159, Fat: 6.0,  Carbs: 24, Protein: 4.0 },
                        { Name: 'Ice cream sandwich', Calories: 237, Fat: 9.0,  Carbs: 37, Protein: 4.3 },
                        { Name: 'Eclair',             Calories: 262, Fat: 16.0, Carbs: 24, Protein: 6.0 },
                        { Name: 'Cupcake',            Calories: 305, Fat: 3.7,  Carbs: 67, Protein: 4.3 },
                        { Name: 'Gingerbread',        Calories: 356, Fat: 16.0, Carbs: 49, Protein: 3.9 },
                        { Name: 'Frozen yoghurt',     Calories: 159, Fat: 6.0,  Carbs: 24, Protein: 4.0 },
                        { Name: 'Ice cream sandwich', Calories: 237, Fat: 9.0,  Carbs: 37, Protein: 4.3 },
                        { Name: 'Eclair',             Calories: 262, Fat: 16.0, Carbs: 24, Protein: 6.0 },
                        { Name: 'Cupcake',            Calories: 305, Fat: 3.7,  Carbs: 67, Protein: 4.3 },
                        { Name: 'Gingerbread',        Calories: 356, Fat: 16.0, Carbs: 49, Protein: 3.9 },
                    ]}/>
                </div>
            </div>
        </div>
    );
};

export default SimulationReport;


