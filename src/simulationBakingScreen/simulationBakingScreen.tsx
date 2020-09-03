import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseStyle, LoadingContainer, LoadingText, LoadingTextContainer, CancelBtn } from './simulationBakingScreen.css';
import { AppState } from '../store';
import './animation.css';
import { CancelBaking } from '../editor/components/rightPanel/components/simulationView/actions';

const SimulationBakingScreen: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const isBaking = useSelector((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx].simulation.isBaking);
    const bakedFrames = useSelector((s:AppState) => 
        s.scenario.scenarios[s.scenario.activeScenarioIdx].simulation.bakedFrames);

    return isBaking?(
        <div style={BaseStyle}>
            <div style={LoadingContainer}>
                <div style={{width: '100%', textAlign: 'center', marginTop: '32px'}}>
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div style={LoadingTextContainer}>
                    <p style={LoadingText}>
                        Status: 
                        <span style={{fontWeight: 400, paddingLeft: '8px'}}>Baking Simulation...</span>
                    </p>
                    <p style={LoadingText}>
                        Baked Frames: 
                        <span style={{fontWeight: 400, paddingLeft: '8px'}}>
                            {bakedFrames.current}/{bakedFrames.total}
                        </span>
                        {
                            !isNaN(bakedFrames.current / bakedFrames.total)?
                            (<span style={{fontWeight: 400, paddingLeft: '8px'}}>
                                ({((bakedFrames.current / bakedFrames.total)*100).toFixed(2)} %)
                            </span>)
                            :null
                        }
                    </p>
                    <button style={CancelBtn} onClick={() => dispatch(CancelBaking())}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ):null
}

export default SimulationBakingScreen;