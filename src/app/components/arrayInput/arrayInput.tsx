import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseStyle, ArrayToolbar, ElementList, Element, ElementName,
    ElementNumber, ViewTitle, AddIcon, ElemIcons } from './arrayInput.css';

interface HasName { name:string }
type OAProps<T> = {
    name: string
    isOrdered? :boolean
    value: { [key:number]: T }
    onAdd?: () => void
    onChange: (obj: { [key:number]: T }) => void
}

function ArrayInput<T extends HasName>(
    props: React.PropsWithChildren<OAProps<T>>
) : JSX.Element {

    const handleAction = (idx: number, action: number) => {
        var newState = {...props.value};
        switch(action){
            case 0: // Add item
                if(props.onAdd) props.onAdd();
                break;
            case 1: // Delete item
                for(var i = 1; i <= Object.keys(props.value).length; i++){
                    if(i > idx) 
                        newState[i-1] = { ...props.value[i], id: i-1};
                }
                delete newState[Object.keys(props.value).length];
                break;
            case 2: // Increment item
                if(idx > 1){
                    newState[idx-1] = { ...props.value[idx], id: idx-1};
                    newState[idx] = { ...props.value[idx-1], id: idx};
                }
                break;
            case 3: // Decrement item
                if(idx < Object.keys(props.value).length){
                    newState[idx+1] = { ...props.value[idx], id: idx+1};
                    newState[idx] = { ...props.value[idx+1], id: idx};
                }
                break;
        }
        props.onChange(newState);
    }

    return <div style={BaseStyle}>
        <div style={ArrayToolbar}>
            <p style={ViewTitle}>{props.name}</p>
            <div style={AddIcon}><FontAwesomeIcon icon={faPlus} onClick={() => {
                handleAction(Object.keys(props.value).length, 0)}}/></div>
        </div>
        <ul style={ElementList}>
            { Object.keys(props.value)
                .map((k:string) => {
                    const item = props.value[+k]
                    return <li style={Element} key={k}>
                        <p style={ElementNumber}>{k}.</p>
                        <p style={ElementName}>{item.name}</p>
                        <div style={ElemIcons}>{
                                props.isOrdered?<>
                                    <FontAwesomeIcon icon={faAngleUp} style={{marginRight: '8px'}}
                                        onClick={() => {handleAction(+k, 2)}} />
                                    <FontAwesomeIcon icon={faAngleDown} style={{marginRight: '8px'}}
                                        onClick={() => {handleAction(+k, 3)}} />
                                </>: null
                            }
                            <FontAwesomeIcon icon={faTrash} 
                                style={{marginRight: '8px', fontSize: '14px'}}
                                onClick={() => {handleAction(+k, 1)}} />
                        </div>
                    </li>
                })
            }
        </ul>
    </div>;
}

export default ArrayInput;