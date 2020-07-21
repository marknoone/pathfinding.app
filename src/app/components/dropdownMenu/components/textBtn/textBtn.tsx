import React from 'react';
import CSS from 'csstype';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../../hover.anim.css';

type DropdownMenuTextBtnProps = {
    title: string

    hasCaret?: boolean
    onClick?: () => void
}

export const BaseStyle: CSS.Properties = {
    fontWeight: 400,
    fontSize: '14px',
    fontFamily: "'Open-sans', sans-serif",
    color: '#000',
    backgroundColor: 'inherit',
    margin: 0,
    lineHeight: '14px',
    padding: '4px 6px'
}

const DropdownMenuTextBtn: React.FunctionComponent<DropdownMenuTextBtnProps> = (props) =>  
    <p style={BaseStyle}
        onClick={() => {
            if(props.onClick) 
                props.onClick()
    }}>
        {props.title}
        {
            props.hasCaret? 
            <div style={{paddingLeft: '8px', color: '#666', display:'inline-block'}}>
                <FontAwesomeIcon icon={faCaretDown}/>
            </div>:
            null 
        }
</p>

export default DropdownMenuTextBtn;