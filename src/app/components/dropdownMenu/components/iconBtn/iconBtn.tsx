import React from 'react';
import CSS from 'csstype';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../hover.anim.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

type DropdownMenuIconBtnProps = {
    icon: IconDefinition

    onClick?: () => void
}


export const BaseStyle: CSS.Properties = {
    padding: '0px 4px',
    color: '#999'
}

const DropdownMenuIconBtn: React.FunctionComponent<DropdownMenuIconBtnProps> = (props) =>  
    <div style={BaseStyle}
        onClick={() => {
            if(props.onClick) 
                props.onClick()
    }}>
        <div style={{display: 'inline-block'}}><FontAwesomeIcon icon={props.icon} /></div>
        <div style={{display: 'inline-block', paddingLeft: '8px'}}><FontAwesomeIcon icon={faCaretDown} /></div>
        
</div>


export default DropdownMenuIconBtn;