import React from 'react';
import { useDispatch } from 'react-redux'
import { GetMenuSectionDefinitions } from './menu';
import { DropdownMenu } from '../../../app/components/dropdownMenu';
import { DropdownMenuTextBtn } from '../../../app/components/dropdownMenu/components/textBtn';
import {
    BaseStyle
} from './actionMenus.css';

const ActionMenus: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const sectionDefintions = GetMenuSectionDefinitions(dispatch);

    return <>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="File"/> } 
            isActive={false}
            onBtnClick={() => {}}
            sections={sectionDefintions["File"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Edit"/> } 
            isActive={false}
            onBtnClick={() => {}}
            sections={sectionDefintions["Edit"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="View"/> }  
            isActive={false}
            onBtnClick={() => {}}
            sections={sectionDefintions["View"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Extras"/> }  
            isActive={false}
            onBtnClick={() => {}}
            sections={sectionDefintions["Extras"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Help"/> } 
            isActive={false}
            onBtnClick={() => {}}
            sections={sectionDefintions["Help"]}/>
    </>;
}

export default ActionMenus;