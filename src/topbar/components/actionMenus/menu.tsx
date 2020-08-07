import { DropdownMenuSection } from '../../../app/components/dropdownMenu/types';
import { Dispatch } from 'react';
type MenuSectionDefintions = {
    [key: string]: DropdownMenuSection[]
}

export const GetMenuSectionDefinitions = (dispatch: Dispatch<any>) => {
    return {
        "File":[
            {
                entries: [
                    { title: "Save", keyboardShortcut: "Ctrl + S", onClick: () => dispatch({type: '@project/SAVE_PROJECT'})}
                ]
            },
            {
                entries: [
                    { title: "Open from local storage", onClick: () => {}},
                    // { title: "Open recent", onClick: () => {}},
                    { title: "New Project", keyboardShortcut: "Ctrl + N", onClick: () => {}}
                ]
            },
            { entries: [{title: "Rename", onClick: () => {}}] },
            { entries: [
                    // { title: "Import from...", onClick: () => {}},
                    { title: "Export as...", onClick: () => {}}
                ]
            },
            // { entries: [{title: "Revision History", onClick: () => {}}] },
            { entries: [{title: "Close", onClick: () => {}}] },
        ],

        "Edit":[
            {
                entries: [
                    { title: "Undo", keyboardShortcut: "Ctrl + Z", onClick: () => {}},
                    { title: "Redo", keyboardShortcut: "Ctrl + Y", onClick: () => {}}
                ]
            },
            {
                entries: [
                    { title: "Cut",     keyboardShortcut: "Ctrl + X", onClick: () => {}},
                    { title: "Copy",    keyboardShortcut: "Ctrl + C", onClick: () => {}},
                    { title: "Paste",   keyboardShortcut: "Ctrl + V", onClick: () => {}}
                ]
            },
            { entries: [{ title: "Duplicate",   keyboardShortcut: "Ctrl + D", onClick: () => {}}] },
            { entries: [{ title: "Lock/Unlock", onClick: () => {}}] },
            { entries: [{ title: "Set Grid Size", onClick: () => {}}] },
        ],

        "View":[
            { 
                entries: [
                    { title: "Inspector Panel",     value: true, onClick: () => {}},
                    { title: "Element Panel",       value: true, onClick: () => {}},
                    { title: "Simulation Panel",    value: true, onClick: () => {}}
                ]
            },
            // { 
            //     entries: [
            //         { title: "Tooltips",    value: true, onClick: () => {}},
            //         { title: "Ruler",       value: true, onClick: () => {}},
            //         { title: "Grid",        value: true, onClick: () => {}}
            //     ]
            // },
            { 
                entries: [
                    { title: "Bus",     value: true, onClick: () => {}},
                    { title: "Train",   value: true, onClick: () => {}},
                    { title: "Tram",    value: true, onClick: () => {}}
                ]
            },
            { 
                entries: [
                    { title: "Reset View",  keyboardShortcut: "Ctrl + R", onClick: () => {}},
                    { title: "Zoom In",     keyboardShortcut: "Ctrl +", onClick: () => {}},
                    { title: "Zoom Out",    keyboardShortcut: "Ctrl -", onClick: () => {}}
                ]
            },
        ],

        "Extras":[
            { entries: [{ title: "Presets",         onClick: () => {}}] },
            // { entries: [{ title: "Autosave",        onClick: () => {}}] },
            { entries: [{ title: "Edit Scenario",   onClick: () => {}}] },
            // { entries: [{ title: "Configuration",   onClick: () => {}}] },
        ],

        "Help":[
            { 
                entries: [
                    { title: "Keyboard Shortcuts",         onClick: () => {}},
                    // { title: "Quick Start Video",         onClick: () => {}},
                ] 
            },
            { entries: [{ title: "About Pathfinding.app",   onClick: () => {}}] },
        ],
    }
}