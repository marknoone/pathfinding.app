import React from 'react';
import { DropdownMenuSection } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {
    BaseStyle,
    MenuBtn,
    MenuContainer,
    EntryTitle,
    EntryToggleIcon,
    EntryShortcut,
    DropdownEntry,
    DropdownSection
} from './dropdownMenu.css';
import './hover.anim.css';

type DropdownMenuProps = {
    render: () => JSX.Element
    sections: DropdownMenuSection[]

    isActive: boolean
    onBtnClick?: () => void
    anchor?: {
        top?: string,
        bottom?: string,
        left?: string,
        right?: string,
    }
}

const DropdownMenu: React.FunctionComponent<DropdownMenuProps> = (props) => {
    return <div style={BaseStyle}>
        <div className="dropdown-hover" style={MenuBtn} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if(props.onBtnClick)
                props.onBtnClick();
        }}>
            {props.render()}
        </div>
        {
            props.isActive? 
            (
                <div style={{
                    ...MenuContainer,
                    ...(props.anchor && {...props.anchor}),
                    ...(!props.anchor && {top: '30px', left: 0,})
                }}>
                    {
                        props.sections.map( (section, i) => 
                                <ul style={DropdownSection} key={i}>
                                    {                                        
                                        section.entries.map( entry =>
                                            <li key={entry.title} style={DropdownEntry} className="dropdown-entry-hover" onClick={() => {
                                                if(entry.onClick)
                                                    entry.onClick();
                                            }}>
                                                <div style={EntryToggleIcon}>
                                                    {
                                                        entry.value?
                                                        <FontAwesomeIcon icon={faCheck} />:
                                                        null
                                                    }
                                                </div>
                                                <p style={EntryTitle}>{entry.title}</p>
                                                { 
                                                    entry.keyboardShortcut?
                                                    <p style={EntryShortcut}>{entry.keyboardShortcut}</p>: 
                                                    null 
                                                }
                                            </li>
                                        )
                                    }
                                </ul>
                        )
                    }
                </div>
            ):
            null
        }
    </div>;
}

export default DropdownMenu;