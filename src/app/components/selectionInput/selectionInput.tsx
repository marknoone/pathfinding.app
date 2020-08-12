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

type SelectionValue = string | number;
type SelectionProps<T> = { 
    value: T, 
    options: { 
        s: string, 
        value: T
    }[] 

    onChange: (e: T) => void
}

function SelectionInput<T>(
    {value, options, onChange}: React.PropsWithChildren<SelectionProps<T>>
) : JSX.Element {
    const [isShowing, setIsShowing] = useState(false)
    return <div style={BaseStyle}>
        <div style={SelectionValue} onClick={() => setIsShowing(!isShowing)}>
            <p style={SelectionPElem}>
                { options.find(val => val.value === value)?.s }
                <span style={{float: 'right', marginRight: '5px'}}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </p>
        </div>
        {
            isShowing?
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