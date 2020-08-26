import React, { useState, useEffect }from 'react';
import { Algorithms, Playspeeds } from './constants';
import { AppState } from '../../../../../store';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownMenu } from '../../../../../app/components/dropdownMenu';
import { SimClockSlider } from './components/simClockSlider';
import { faPlay, faForward, faStepForward, faBackward, 
    faStepBackward, faCaretDown, faStop} from '@fortawesome/free-solid-svg-icons';
import { SetSimulationAlgorithm, IncPlaySpeed, DecPlaySpeed, IncSimulationFrame, 
    DecSimulationFrame, SetIsPlaying, SetSimOptions, SimulateScenario, SetSimulationFrame } from './actions';
import {
    BaseStyle,
    InputText,
    SimOptionInput,
    SimText,
    SimSection,
    SimOption,
    SimHeader,
    SimBtn,
    SimPlaybackCtrl,
    SimPlaybackCtrlList,
    SimPlaybackCtrlElem,
} from './simulationView.css';

const AlgorithmNames = {
    1: "Dijkstra",
    2: "TD-Dijkstra",
    3: "MM-TD-Dijkstra",
    4: "CMT-Dijkstra"
}

const getTimeFromSeconds = (s:number):string =>
    `${Math.floor(s/60/60)}:${Math.floor((s/60)%60)}:${s % 60} (${s})`;

const SimulationView: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const [isDropdownShowing, setIsDropdownShowing] = useState(false);
    const projID = useSelector((s:AppState) => s.project.id);
    const scenarioIdx = useSelector((s:AppState) => s.scenario.activeScenarioIdx);
    const config = useSelector((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx].simulation, shallowEqual);
    // const [rAF, setrAF] = useState<number>(0);
    // useEffect(() => {
    //     // setrAF(requestAnimationFrame(updateVehicles))
    //     return () => {
    //         cancelAnimationFrame(rAF);
    //     }
    // }, [])

    // const updateVehicles = () => {
    //     console.log("Works!");
    //     setrAF(requestAnimationFrame(updateVehicles));
    // }
 
    const setAlg = (a: Algorithms) => { dispatch(SetSimulationAlgorithm(a)); setIsDropdownShowing(false); } 
    return <div style={BaseStyle}>
        <div style={SimSection}>
            <p style={SimHeader}>Algorithm</p>
            <p style={SimText}> Currently selected:</p> 
            <DropdownMenu 
                render={ () => <>
                    <span style={{...SimText, fontWeight: 600, color: '#464646'}}>{AlgorithmNames[config.algorithm]}</span>
                    <span style={{ paddingLeft: '8px'}}><FontAwesomeIcon icon={faCaretDown} /></span>
                </>} 
                isActive={isDropdownShowing}
                onBtnClick={() => {setIsDropdownShowing(!isDropdownShowing)}}
                sections={[{entries: [
                            { title: "Dijkstra",        onClick: () => setAlg(Algorithms.Dijkstra)},
                            { title: "TD-Dijkstra",     onClick: () => setAlg(Algorithms.TimeDependentDijkstra)},
                            { title: "MM-TD-Dijkstra",  onClick: () => setAlg(Algorithms.MultiModalTimeDependentDijkstra)},
                            { title: "CMT-Dijkstra",    onClick: () => setAlg(Algorithms.CMTDijkstra)},
                    ]},
                ]}/>
        </div>
        <div style={{...SimSection}}>
            <p style={SimHeader}>Controls (Speed: {Playspeeds[config.playSpeedIdx]}x, Time: {getTimeFromSeconds(config.simClock)})</p>
            <button disabled={config.algorithm !== Algorithms.CMTDijkstra} 
            style={{
                ...SimBtn, 
                marginTop: '24px',
                cursor: config.algorithm !== Algorithms.CMTDijkstra?  'not-allowed':'pointer',
                backgroundColor: config.algorithm !== Algorithms.CMTDijkstra?  '#666':'#ff9f43'
            }}>Bake</button>
            <button style={{...SimBtn, backgroundColor: '#10ac84'}} onClick={() => dispatch(SimulateScenario())}>Simulate</button>
            <div style={SimPlaybackCtrl}>
                <ul style={SimPlaybackCtrlList}>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(DecSimulationFrame())}> <FontAwesomeIcon icon={faStepBackward}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(DecPlaySpeed())}> <FontAwesomeIcon icon={faBackward}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(SetIsPlaying(!config.isPlaying))}> <FontAwesomeIcon icon={config.isPlaying?faStop:faPlay}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(IncPlaySpeed())}> <FontAwesomeIcon icon={faForward}/> </li>
                    <li style={SimPlaybackCtrlElem} onClick={() => dispatch(IncSimulationFrame())}> <FontAwesomeIcon icon={faStepForward}/> </li>
                </ul>
            </div>
            <div>
                <SimClockSlider value={config.simClock} range={[0, (24*60*60)]} 
                    onChange={(e: number) => dispatch(SetSimulationFrame(e))} />
            </div>
        </div>
        <div style={{marginTop: '36px'}}>
            <ul style={{listStyle: 'none', padding: '0px 10px', margin: 0}}>
                <li style={SimOption}>
                    <p style={SimHeader}>Stop time per passenger (secs.):</p>
                    <input type="text" style={InputText} value={config.options.stopTime.toFixed(2)}
                     onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value); 
                        if (!isNaN(num))
                            dispatch(SetSimOptions({
                                ...config.options, 
                                stopTime: num
                            }))
                    }}/>
                </li>  
                <li style={SimOption}>
                    <p style={SimHeader}>Distance Multiplyer:</p>
                    <input type="text" style={InputText} value={config.options.distanceMul.toFixed(2)}
                     onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = ev.target.value === "" ? 1.2: parseFloat(ev.target.value);
                        
                        if (!isNaN(num))
                            dispatch(SetSimOptions({
                                ...config.options, 
                                distanceMul: num,
                            }))
                    }}/>
                </li>              
                <li style={SimOption}>
                    <p style={SimHeader}>Transit Mode Speeds:</p>
                    <div style={{position: 'relative', margin: '8px 0px'}}>
                        <p style={{...SimText, fontSize: '12px'}}>Foot:</p>
                        <input type="text" value={config.options.modeSpeeds.foot.toFixed(2)}
                            style={SimOptionInput} 
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value); 
                                if (!isNaN(num))
                                    dispatch(SetSimOptions({
                                        ...config.options, 
                                        modeSpeeds: {
                                            ...config.options.modeSpeeds,
                                            foot: num
                                        },
                                    }))
                            }}/>
                    </div>
                    <div style={{position: 'relative', margin: '8px 0px'}}>
                        <p style={{...SimText, fontSize: '12px'}}>Bus:</p>
                        <input type="text" value={config.options.modeSpeeds.bus.toFixed(2)}
                            style={SimOptionInput}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value);
                                if (!isNaN(num))
                                    dispatch(SetSimOptions({
                                        ...config.options, 
                                        modeSpeeds: {
                                            ...config.options.modeSpeeds,
                                            bus: num
                                        },
                                    }))
                            }}/>
                    </div>
                    <div style={{position: 'relative', margin: '8px 0px'}}>
                        <p style={{...SimText, fontSize: '12px'}}>Tram:</p>
                        <input type="text"  value={config.options.modeSpeeds.tram.toFixed(2)}
                            style={SimOptionInput}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value);
                                if (!isNaN(num))
                                    dispatch(SetSimOptions({
                                        ...config.options, 
                                        modeSpeeds: {
                                            ...config.options.modeSpeeds,
                                            tram: num
                                        },
                                    }))
                            }}/>
                    </div>
                    <div style={{position: 'relative', margin: '8px 0px'}}>
                        <p style={{...SimText, fontSize: '12px'}}>Train:</p>
                        <input type="text" value={config.options.modeSpeeds.train.toFixed(2)}
                            style={SimOptionInput}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value); 
                                if (!isNaN(num))
                                    dispatch(SetSimOptions({
                                        ...config.options, 
                                        modeSpeeds: {
                                            ...config.options.modeSpeeds,
                                            train: num
                                        },
                                    }))
                            }}/>
                    </div>
                </li>
                <li style={SimOption}>
                    <p style={SimHeader}>Algorithm MM Language:</p>
                    <input type="text" style={{
                        ...InputText, cursor: 
                        (config.algorithm !== Algorithms.MultiModalTimeDependentDijkstra 
                        && config.algorithm !== Algorithms.CMTDijkstra)?  'not-allowed':'pointer'
                    }} value={config.options.mmLanguage} disabled={
                        config.algorithm !== Algorithms.MultiModalTimeDependentDijkstra 
                        && config.algorithm !== Algorithms.CMTDijkstra }
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch(SetSimOptions({
                                ...config.options, 
                                mmLanguage: ev.target.value,
                            }))
                        }}/>
                </li>
                <li style={SimOption}>
                    <p style={SimHeader}>Congestion Interval:</p>
                    <input type="text" style={{
                        ...InputText, 
                        cursor: config.algorithm !== Algorithms.CMTDijkstra?  'not-allowed':'pointer'
                    }} value={config.options.congestionInterval.toFixed(2)}  disabled={ config.algorithm !== Algorithms.CMTDijkstra }
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value);
                        if (!isNaN(num))
                            dispatch(SetSimOptions({
                                ...config.options, 
                                congestionInterval: num,
                            }))
                    }}/>
                </li>
                <li style={SimOption}>
                    <p style={SimHeader}>Passenger Compliance (Percent):</p>
                    <input type="text" style={{
                        ...InputText, 
                        cursor: config.algorithm !== Algorithms.CMTDijkstra?  'not-allowed':'pointer'
                    }} value={config.options.passengerCompliance.toFixed(2)}  disabled={ config.algorithm !== Algorithms.CMTDijkstra }
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                        const num: number = ev.target.value === ""? 0: parseFloat(ev.target.value); 
                        if (!isNaN(num))
                            dispatch(SetSimOptions({
                                ...config.options, 
                                passengerCompliance: num,
                            }))
                    }}/>
                </li>
                <li style={SimOption}>
                    <p style={SimHeader}>Results Report:</p>
                    <button style={{
                            ...SimBtn,
                            width: 'calc(100% - 8px)',
                            cursor: config.isSimulating?'#pointer':'not-allowed',
                            backgroundColor: config.isSimulating?'#2e86de':'#666'
                        }} disabled={!config.isSimulating} 
                        onClick={() => window.open(`/report?proj=${projID}&scenario=${scenarioIdx}`, "_blank")}
                    >Get Simulation Report</button>
                </li>
            </ul>
        </div>
    </div>;
}

export default SimulationView;