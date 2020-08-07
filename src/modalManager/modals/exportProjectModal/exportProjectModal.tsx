import React from 'react';
import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import CSS from 'csstype';

const LiElem: CSS.Properties = {
    padding: '21px 15px',
    borderBottom: '1px solid #dedede',
};

const Icon: CSS.Properties = {
    float: 'right',
    marginRight: '24px',
    color: '#666'
}

const Label: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    display: 'inline-block',
    color: '#666',
    margin: 0
}

const ExportProjectModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    return  <Modal title="Export Project"
        size={{w: '520px', h: '261px'}}
        render={() =>{
            return <ul style={{padding: 0, margin: 0, listStyle: 'none'}}>
                <li style={LiElem} onClick={() => {}}>
                    <p style={Label}>XML</p>
                    <div style={Icon}><FontAwesomeIcon icon={faDownload} /></div>
                </li>
                <li style={LiElem} onClick={() => {}}>
                    <p style={Label}>JSON</p>
                    <div style={Icon}><FontAwesomeIcon icon={faDownload} /></div>
                </li>
            </ul>;
        }
    }/>  
}
    
export default ExportProjectModal;