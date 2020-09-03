import React, {useState, useMemo} from 'react';
import { AppState } from '../../../../../store';
import { PassengerElement } from './passengerView';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { makeGetChildElemsByIDSelector } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PassengerDirectory, isPassengerDirectory } from './constants';
import { AddEmptyDirectoryToDirectory, AddEmptyPassengerToDirectory } from './actions';
import { faCaretRight, faCaretDown, faFolderPlus, faUserPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../../../../../modalManager/actions';
import { ModalType } from '../../../../../modalManager/constants';
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
    const dispatch = useDispatch();
    const [isHovering, setIsHovering] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const getChildElemsByID = useMemo(makeGetChildElemsByIDSelector, [])
    const children = useSelector((state: AppState) => getChildElemsByID(state, props.dir.id), shallowEqual)

    return <div style={PassengerDirectoryStyle} >
        <div 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
            style={ListElement}
        >
            <div style={{...CollapseIcon, ...(isCollapsed && {padding: '0px 3px'})}}
                onClick={() => { setIsCollapsed(!isCollapsed)}}>
                <FontAwesomeIcon icon={!isCollapsed?faCaretDown:faCaretRight}/>
            </div>
            <p style={DirName} onClick={() => { setIsCollapsed(!isCollapsed)}}>{props.dir.name}</p>
            {
                isHovering?
                    <div style={HoverIcon}>
                        <div style={{...Icon, fontSize: '11px'}} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault();
                            dispatch(showModal({modalProps: { dirID: props.dir.id }, modalType: ModalType.DIR_EDIT_MODAL}))
                        }}><FontAwesomeIcon icon={faEdit} /></div>
                        <div style={{...Icon, fontSize: '11px'}} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault();
                            dispatch(AddEmptyPassengerToDirectory(props.dir.id))
                        }}><FontAwesomeIcon icon={faUserPlus} /></div>
                        <div style={{...Icon, fontSize: '15px'}} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault();
                            dispatch(AddEmptyDirectoryToDirectory(props.dir.id))
                        }}><FontAwesomeIcon icon={faFolderPlus} /></div>
                    </div>
                : null
            }
        </div>
        {
            !isCollapsed?
            <div style={ChildrenList}>
                {   children && children.length > 0?
                    children.map( (child) => {
                        if(isPassengerDirectory(child)){
                            return <PassengerDirectoryElement key={child.id} dir={child} />
                        } else {
                            return <PassengerElement key={child.id} passenger={child} />
                        }
                    }):
                    null
                }
            </div>:
            null
        }
    </div>
}

export default PassengerDirectoryElement;
