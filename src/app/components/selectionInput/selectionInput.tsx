import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { 
    BaseStyle, 
    SelectionValue, 
    SelectionPElem, 
    OptionsContainer, 
    OptionList, 
    OptionListElem 
}   from './selectionInput.css';
import './hover.anim.css';
import { ProjectActionTypes } from '../../store/project/constants';

type SelectionValue = string | number;
type SelectionProps<T> = { 
    value: T, 
    disabled? :boolean
    options: { 
        s: string, 
        value: T
    }[] 

    onChange: (e: T) => void
}

function SelectionInput<T>(
    {value, disabled, options, onChange}: React.PropsWithChildren<SelectionProps<T>>
) : JSX.Element {
    const [isShowing, setIsShowing] = useState(false)
    return <div style={BaseStyle}>
        <div style={{
            ...SelectionValue,
            ...(disabled && {backgroundColor: '#e5e5e5', cursor: 'not-allowed'}),
            ...(!disabled && {backgroundColor: 'white', cursor: 'pointer'}),
        }} onClick={() => {if(!disabled) setIsShowing(!isShowing)}}>
            <p style={SelectionPElem}>
                { options.find(val => val.value === value)?.s }
                <span style={{float: 'right', marginRight: '5px'}}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </p>
        </div>
        {
            isShowing && !disabled?
            <div style={OptionsContainer}>
                <ul style={OptionList}> 
                    { options.map( (el, i) => 
                        <li key={i}
                          className="selection-input-hover"
                          style={OptionListElem}
                          onClick={() => {
                              onChange(el.value);
                              setIsShowing(false);
                          }}>
                            {el.s} 
                        </li>
                    )} 
                </ul>
            </div>
            :null
        }
    </div>;
}

export default SelectionInput;