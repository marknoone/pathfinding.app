import React from 'react';
import { TextDropdownMenu } from '../../../app/components/dropdownMenu';
import { DropdownMenuTextBtn } from '../../../app/components/dropdownMenu/components/textBtn';
import { DropdownMenuIconBtn } from '../../../app/components/dropdownMenu/components/iconBtn';
import {
    BaseStyle
} from './actionMenus.css';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const ActionMenus: React.FunctionComponent = (props) => {
    return <>
        <TextDropdownMenu 
            render={ () => <DropdownMenuTextBtn title="File" /> } 
            isActive={true}
            onBtnClick={() => {}}
            sections={[
                {
                    header: 'Testing',
                    entries: [
                        { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}},
                        { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}}
                ]},
                {
                    header: 'Testing',
                    entries: [
                        { title: "Select All", value: false, keyboardShortcut: "Ctrl + A", onClick: () => {}},
                        { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}}
                ]},
            ]}/>
        {/* <TextDropdownMenu 
            title="Edit" 
            isActive={false}
            onBtnClick={() => {}}
            sections={[]}/>
        <TextDropdownMenu 
            title="View" 
            isActive={false}
            onBtnClick={() => {}}
            sections={[]}/>
        <TextDropdownMenu 
            title="Extras" 
            isActive={false}
            onBtnClick={() => {}}
            sections={[]}/>
        <TextDropdownMenu 
            title="Help" 
            isActive={false}
            onBtnClick={() => {}}
            sections={[]}/> */}
    </>;
}

export default ActionMenus;