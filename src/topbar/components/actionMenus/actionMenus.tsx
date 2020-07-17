import React from 'react';
import { TextDropdownMenu } from '../../../app/components/textDropdownMenu';
import {
    BaseStyle
} from './actionMenus.css';

const ActionMenus: React.FunctionComponent = (props) => {
    return <>
        <TextDropdownMenu 
            title="File" 
            isActive={false}
            onBtnClick={() => {}}
            sections={[]}/>
        <TextDropdownMenu 
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
            sections={[]}/>
    </>;
}

export default ActionMenus;