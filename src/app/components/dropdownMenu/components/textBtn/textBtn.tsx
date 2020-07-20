import React from 'react';
import CSS from 'csstype';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import '../../hover.anim.css';

type DropdownMenuTextBtnProps = {
    title: string

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
    padding: '4px 10px'
}

const DropdownMenuTextBtn: React.FunctionComponent<DropdownMenuTextBtnProps> = (props) =>  
    <p style={BaseStyle}
        onClick={() => {
            if(props.onClick) 
                props.onClick()
    }}>
        {props.title}
</p>

export default DropdownMenuTextBtn;