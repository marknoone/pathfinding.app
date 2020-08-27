import React from 'react';
import NoReportSelected from './noReport';
import D3Chart from './components/d3Chart';
import { getCalculatedResults } from './data';
import { useLocation } from 'react-router-dom';
import { TableView } from './components/tableView';
import { MetricView } from './components/metricView';
import { GetSimulationResults } from '../app/pkg/simulation';
import { BaseStyle, DataContainer, MetricContainer, GraphContainer, LIElem } 
    from './simulationReport.css';

const useQuery = () => new URLSearchParams(useLocation().search);

const SimulationReport: React.FunctionComponent = (props) => {
    const query = useQuery();
    const projectID = query.get("proj"), scenarioID = query.get("scenario");
    if(!projectID || !scenarioID) return <NoReportSelected />;
    const results = GetSimulationResults(projectID, scenarioID);
    if(!results) return <NoReportSelected />;

    const calculatedResults = getCalculatedResults(results);

    return (
        <div style={BaseStyle}>
            <p style={{
                width: '100%', padding: '10px 20vw 30px 20vw',
                fontSize: '20px', fontWeight: 500, fontFamily: "'Montserrat', sans-serif",
                color: '#464646', margin: 0
            }}>Simulation Results: <span style={{textDecoration: 'italic'}}>{"Untitled Project"}</span>, Scenario: <span>{1}</span></p>
            <div style={DataContainer}> 
                <div style={MetricContainer}><MetricView metrics={calculatedResults.baseMetrics}/></div>
                <ul style={{margin: '25px 0px', padding: 0, listStyle: 'none', width: '100%'}}>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Journey Times Predicted (over Day)"
                                graphs={calculatedResults.journeyTimesPredicted}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Passenger Congestion (over Lifetime)"
                                graphs={calculatedResults.congestionPassengerLifetime}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Journey Times Experienced (over Day)"
                                graphs={calculatedResults.journeyTimesExperienced}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Vehicle Congestion (over Lifetime)"
                                graphs={calculatedResults.congestionVehicleLifetime}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Station Congestion (over Day)"
                                graphs={calculatedResults.congestionStationDay}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Vehicle Congestion (over Day)"
                                graphs={calculatedResults.congestionVehicleDay}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Experienced Time At Stop (Passenger/Day)"
                                graphs={calculatedResults.timeAtStopPassenger}
                            />
                        </div>
                    </li>
                    <li style={{...LIElem, paddingRight: '10px'}}>
                        <div style={GraphContainer}>
                            <D3Chart 
                                title="Time At Stop (Vehicle/Day)"
                                graphs={calculatedResults.timeAtStopVehicle}
                            />
                        </div>
                    </li>
                </ul>
                <div style={{width: '100%', marginBottom: '64px', marginTop: '24px', float: 'left'}}>
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


