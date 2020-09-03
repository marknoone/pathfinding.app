import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faPlus, faLock } from '@fortawesome/free-solid-svg-icons';
import { CategoryEntry, CollapseIcon, CategoryName, AddIcon, CategoryChildren,
    CCChild, LockIcon } from './componentView.css';

export type CCElem = {id: number, name: string, isLocked: boolean}
export type CCElemDataObj = { [key:number] :CCElem }

type ChildProps = { 
    elem: CCElem, 
    isActive: boolean, 

    onItemClick?: () => void,
    onItemLock?: () => void
}
const CategoryChild: React.FunctionComponent<ChildProps> = (props)=> {
    const [isHovering, setIsHovering] = useState(false);

    return <div style={{
            ...CCChild,
            ...(props.isActive && { backgroundColor: '#e8e8e8' })
        }} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
            if(props.onItemClick)
                props.onItemClick()
        }}> 
            {props.elem.name} 
            {
                ( isHovering || props.elem.isLocked) ? 
                <div style={LockIcon}>
                    <span style={{ 
                        cursor: 'pointer',
                        color: props.elem.isLocked?'#464646': 'rgb(153, 153, 153)'
                    }} onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                        event.preventDefault();
                        if(props.onItemLock) props.onItemLock()
                    }}>
                        <FontAwesomeIcon icon={faLock}/></span>
                </div>
                :null
            }
        </div>
}

type CCProps = { 
    category:string,  
    activeItem: number,
    items: CCElemDataObj

    addItem: () => void,
    onItemClick?: (id: number) => void,
    onItemLock?: (id: number) => void
}
const ComponentCategoryView: React.FunctionComponent<CCProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return <><div style={CategoryEntry}>
            <div style={CollapseIcon} onClick={() => {setIsCollapsed(!isCollapsed)}}>
                <FontAwesomeIcon icon={isCollapsed? faCaretRight:faCaretDown}/></div>
            <p style={CategoryName}>{props.category}</p>
            <div style={AddIcon} onClick={() => {props.addItem()}}>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
        </div>
        {
            !isCollapsed? 
            <div style={CategoryChildren}>
                {
                    Object.keys(props.items).map((k:any, i:number) => {
                        return <CategoryChild key={props.items[k].id}
                            elem={props.items[k]} isActive={i+1 === props.activeItem}
                            onItemClick={() => { if(props.onItemClick) props.onItemClick(props.items[k].id) }}
                            onItemLock={() => { if(props.onItemLock) props.onItemLock(props.items[k].id) }}
                        />
                    })
                }
            </div>
            :null 
        }
    </>;
}

export default ComponentCategoryView;
