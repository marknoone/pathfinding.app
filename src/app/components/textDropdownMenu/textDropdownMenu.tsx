import React from 'react';
import { DropdownMenuSection } from './types';
import {
    BaseStyle,
    MenuBtn,
    MenuContainer,
    EntryTitle,
    EntryShortcut,
    DropdownEntry,
    DropdownSection
} from './textDropdownMenu.css';
import './hover.anim.css';

type DropdownMenuProps = {
    title: string
    sections: DropdownMenuSection[]
    isActive: boolean

    onBtnClick?: () => void
}

const DropdownMenu: React.FunctionComponent<DropdownMenuProps> = (props) => {
    return <div style={BaseStyle}>
        <a className="dropdown-hover" style={MenuBtn} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if(props.onBtnClick)
                props.onBtnClick();
        }}>
            {props.title}
        </a>
        {
            props.isActive? 
            (
                <div style={MenuContainer}>
                    {
                        props.sections.map( section => (
                            <>
                                {section.header? (<p>{section.header}</p>):null}
                                <ul style={DropdownSection}>
                                    {
                                        section.entries.map( entry => <li style={DropdownEntry}>
                                            <p style={EntryTitle}>{entry.title}</p>
                                            { 
                                                entry.keyboardShortcut?
                                                <p style={EntryShortcut}>{entry.keyboardShortcut}</p>: 
                                                null 
                                            }
                                        </li>)
                                    }
                                </ul>
                            </>
                        ))
                    }
                </div>
            ):
            null
        }
    </div>;
}

export default DropdownMenu;