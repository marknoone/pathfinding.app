import React, {useState, useMemo} from 'react';
import { useSelector } from 'react-redux';
import { IDProps } from './passengerView';
import { AppState } from '../../../../../store';
import { makeGetPassengerElemByIDPropsSelector } from './selectors'
import { Passenger, PassengerDirectory, isPassengerDirectory } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faFolderPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
    PassengerDirectoryStyle,
    ListElement,
    DirName,
    HoverIcon,
    ChildrenList,
    CollapseIcon
} from './passengerView.css';

const PassengerDirectoryElement: React.FunctionComponent<IDProps> = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const getPassengerElemByIDProps = useMemo(makeGetPassengerElemByIDPropsSelector, [])
    const dir = useSelector((state: AppState) => 
        getPassengerElemByIDProps(state, props.id)) as PassengerDirectory

    return <div 
            style={PassengerDirectoryStyle} 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
        >
        <div style={ListElement}>
            <div style={CollapseIcon}>
                <FontAwesomeIcon icon={dir.isCollapsed?faCaretRight:faCaretDown}/>
            </div>
            <p style={DirName}>{dir.name}</p>
            <div style={HoverIcon}>
                <div style={{}}><FontAwesomeIcon icon={faUserPlus} /></div>
                <div style={{}}><FontAwesomeIcon icon={faFolderPlus} /></div>
            </div>
        </div>
        {
            !dir.isCollapsed?
            <div style={ChildrenList}>
                
            </div>:
            null
        }
    </div>
}

export default PassengerDirectoryElement;
