import React, {useState, useEffect} from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { PresetActionTypes } from '../../../app/pkg/presets/saga';
import CSS from 'csstype';

export type Preset = {
    name: string,
    link: string
}

const LiElem: CSS.Properties = {
    margin: 0,
    padding: '12px 16px',
    borderBottom: '1px solid #dedede',
    position: 'relative',
    cursor: 'pointer'
}

const ProjectName: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    display: 'inline-block',
    color: '#464646',
    margin: 0,
    paddingLeft: '16px'
}

const Icon: CSS.Properties = {
    color: '#464646',
    fontSize: '18px',
    padding: '15px 5px'
}

const PresetSelectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const [clickedIdx, setClickedIdx] = useState<number>(-1);
    const [presets, setPresets] = useState<Preset[]>();

    useEffect(() => {
        // Get master preset list for 
        setPresets([
            {name: "Preset 1", link: "http://google.com"},
            {name: "Preset 2", link: "http://google.com"},
            {name: "Preset 3", link: "http://google.com"},
        ])
    }, [])
    
    return  <Modal title="Select A Preset"
    size={{w: '520px', h: '360px'}}
        primaryAction={{
            name: "Select",
            func: () => {
                if(clickedIdx > 0 && presets)
                    dispatch({
                    type: PresetActionTypes.SET_STATE_FROM_PRESET, 
                    payload: {url: presets[clickedIdx].link}
                })
            }
        }}
        render={() =>{
            return <ul style={{padding: 0, margin: 0, listStyle: 'none'}}>
                {
                    presets?
                    presets.map((p, i) => 
                        <li key={i} className="summary-hover-anim"
                            style={{...LiElem, backgroundColor:clickedIdx === i? '#e8e8e8': ""}}
                            onClick={() => setClickedIdx(i)}
                        >
                            <span style={Icon}><FontAwesomeIcon icon={faFile} /></span>
                            <p style={ProjectName}>{p.name}</p>
                        </li>
                    ):
                    null
                }
            </ul>;
        }
    }/>  
}
    
export default PresetSelectModal;