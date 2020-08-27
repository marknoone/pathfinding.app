import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBug, faBus, faFlag, faUserFriends, faExchangeAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import D3Chart, { drawAreaChart, drawDivergentBarPlot, drawBarPlot } from './components/d3Chart';
import { GetSimulationResults } from '../app/pkg/simulation';
import { MetricView } from './components/metricView';
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

const dummyAreaChart = {
    0: {
        name: "Test",
        draw: (ref: React.RefObject<HTMLDivElement>) =>
            drawAreaChart(dummyData, ref)
    }
}
const dummyDivergentBarChart = {
    0: {
        name: "Test",
        draw: (ref: React.RefObject<HTMLDivElement>) =>
            drawDivergentBarPlot(dummyDivergentData, ref)
    }
}

const dummyBarChart = {
    0: {
        name: "Test",
        draw: (ref: React.RefObject<HTMLDivElement>) =>
            drawBarPlot(dummyData, ref)
    }
}

const dummyData = [
    { xAxis: 0, yAxis: 6 },
    { xAxis: 1, yAxis: 4 },
    { xAxis: 2, yAxis: 3 },
    { xAxis: 3, yAxis: 7 },
    { xAxis: 4, yAxis: 10 },
    { xAxis: 5, yAxis: 3 },
];

const dummyDivergentData = [
    { xAxis: 0, yAxis: 6 },
    { xAxis: 1, yAxis: 4 },
    { xAxis: 2, yAxis: 3 },
    { xAxis: 3, yAxis: 7 },
    { xAxis: 4, yAxis: -10 },
    { xAxis: 5, yAxis: 18 },
    { xAxis: 6, yAxis: 1 },
    { xAxis: 7, yAxis: 7 },
    { xAxis: 8, yAxis: 22 },
];

const dummyMetrics = [
    { title: "AVERAGE", value: "12 Mins" },
    { title: "MEDIAN",  value: "9 Mins" },
    { title: "EXAMPLE", value: "$12.00" }
];

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
                        <div style={GraphContainer}><D3Chart title="Journey Times Predicted (over Day)" metrics={dummyMetrics} graphs={dummyBarChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Passenger Congestion (over Lifetime)" metrics={dummyMetrics} graphs={dummyAreaChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Journey Times Experienced (over Day)" metrics={dummyMetrics} graphs={dummyDivergentBarChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Vehicle Congestion (over Lifetime)" metrics={dummyMetrics} graphs={dummyAreaChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Station Congestion (over Day)" metrics={dummyMetrics} graphs={dummyAreaChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Vehicle Congestion (over Day)" metrics={dummyMetrics} graphs={dummyAreaChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Time At Stop (Passenger/Day)" metrics={dummyMetrics} graphs={dummyAreaChart}/></div>
                    </li>
                    <li style={{...LIElem, paddingLeft:  '10px'}}>
                        <div style={GraphContainer}><D3Chart title="Time At Stop (Vehicle/Day)" metrics={dummyMetrics} graphs={dummyAreaChart}/></div>
                    </li>
                </ul>
                <div style={{width: '100%', marginBottom: '64px'}}>
                    <TableView title="Simulation Breakdown" tables={{
                        0:{
                            name: "test",
                            rows: [
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
                            ]
                        },
                    }}/>
                </div>
            </div>
        </div>
    );
};

export default SimulationReport;


