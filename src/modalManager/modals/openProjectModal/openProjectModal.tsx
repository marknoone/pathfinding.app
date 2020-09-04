import React, { useState } from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { DefaultLocalStorage } from '../../../app/pkg/storage/localStorage';
import { LoadProject } from '../../../app/store/project/actions';
import { showModal } from '../../actions';
import { ProjectSummary } from '../../../app/store/project/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import CSS from 'csstype';
import './hover.anim.css';
import { ModalType } from '../../constants';

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

const EditText: CSS.Properties = {
    color: '#999',
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 500,
    display: 'inline-block',
    position:'absolute',
    right: '16px',
    top: '16px',
    margin: 0
}

const OpenProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const [clickedIdx, setClickedIdx] = useState<number>(-1);
    const [summaries, setSummaries] = useState<ProjectSummary[]>(
        DefaultLocalStorage.GetProjectSummaries()
    );

    return  <Modal title="Open Project"
        size={{w: '520px', h: '360px'}}
        primaryAction={{
            name: "Open",
            func: () => { if(clickedIdx >= 0) dispatch(LoadProject(summaries[clickedIdx].id))}
        }}
        render={() =>{
            return <ul style={{padding: 0, margin: 0, height: '100%', overflowY: 'auto', listStyle: 'none'}}>
                {
                    summaries.map((s, i) => {
                        const date = new Date(s.lastEdited)
                        return <li key={s.id} className="summary-hover-anim"
                            style={{...LiElem, backgroundColor:clickedIdx === i? '#e8e8e8': ""}}
                            onClick={() => setClickedIdx(i)}
                        >
                            <span style={Icon}><FontAwesomeIcon icon={faFile} /></span>
                            <p style={ProjectName}>{s.name}</p>
                            <p style={EditText}>Last Edited: {date.toUTCString()}</p>
                        </li>
                    })
                }
                <li className="summary-hover-anim"style={LiElem}
                    onClick={() => dispatch(showModal({modalProps: {}, modalType: ModalType.CREATE_PROJECT_MODAL}))}>
                    <span style={{...Icon, fontSize: '14px'}}><FontAwesomeIcon icon={faPlus} /></span>
                    <p style={ProjectName}> Create A New Project</p>
                </li>
            </ul>;
        }
    }/>  
}
    
export default OpenProjectModal;