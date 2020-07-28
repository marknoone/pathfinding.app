import React, {useState, useMemo} from 'react';
import { PassengerElement } from './passengerView';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import { makeGetChildElemsByIDSelector } from './selectors';
import { PassengerDirectory, isPassengerDirectory } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faFolderPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
    PassengerDirectoryStyle,
    ListElement,
    DirName,
    HoverIcon,
    ChildrenList,
    CollapseIcon,
    Icon
} from './passengerView.css';

type PDProps = { dir: PassengerDirectory }
const PassengerDirectoryElement: React.FunctionComponent<PDProps> = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const getChildElemsByID = useMemo(makeGetChildElemsByIDSelector, [])
    const children = useSelector((state: AppState) => getChildElemsByID(state, props.dir.id))
    console.log(children)

    return <div style={PassengerDirectoryStyle} >
        <div 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => { setIsCollapsed(!isCollapsed)}}
            style={ListElement}
        >
            <div style={{...CollapseIcon, ...(isCollapsed && {padding: '0px 3px'})}}>
                <FontAwesomeIcon icon={!isCollapsed?faCaretDown:faCaretRight}/>
            </div>
            <p style={DirName}>{props.dir.name}</p>
            {
                isHovering?
                    <div style={HoverIcon}>
                        <div style={{...Icon, fontSize: '11px'}}><FontAwesomeIcon icon={faUserPlus} /></div>
                        <div style={{...Icon, fontSize: '15px'}}><FontAwesomeIcon icon={faFolderPlus} /></div>
                    </div>
                : null
            }
        </div>
        {
            !isCollapsed?
            <div style={ChildrenList}>
                {
                    children.map( (child) => {
                        if(isPassengerDirectory(child)){
                            return <PassengerDirectoryElement key={child.id} dir={child} />
                        } else {
                            return <PassengerElement key={child.id} passenger={child} />
                        }
                    })
                }
            </div>:
            null
        }
    </div>
}

export default PassengerDirectoryElement;
