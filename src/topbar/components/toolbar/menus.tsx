import { DropdownMenuSection } from '../../../app/components/dropdownMenu/types';
import { Dispatch } from 'react';
type MenuSectionDefintions = {
    [key: string]: DropdownMenuSection[]
}

export const GetMenuSectionDefinitions = (dispatch: Dispatch<any>) => {
    return {
        "panels":[
            {
                entries: [
                    { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}},
                    { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}}
            ]},
            {
                entries: [
                    { title: "Select All", value: false, keyboardShortcut: "Ctrl + A", onClick: () => {}},
                    { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}}
            ]},
        ],
        "zoomSelection":[
            {
                entries: [
                    { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}},
                    { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}}
            ]},
            {
                entries: [
                    { title: "Select All", value: false, keyboardShortcut: "Ctrl + A", onClick: () => {}},
                    { title: "Select All", value: true, keyboardShortcut: "Ctrl + A", onClick: () => {}}
            ]},
        ],
        "addElement":[
            { entries: [
                    { title: "Select All", value: true, keyboardShortcut: "", onClick: () => {}},
                    { title: "Select All", value: true, keyboardShortcut: "", onClick: () => {}}
            ]}
        ],
    }
}