import React from 'react';
import { AppState } from '../../../store';
import { GetMenuSectionDefinitions } from './menu';
import { DropdownMenu } from '../../../app/components/dropdownMenu';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DropdownMenuTextBtn } from '../../../app/components/dropdownMenu/components/textBtn';
import {
    SetFileMenuValue,
    SetEditMenuValue,
    SetViewMenuValue,
    SetExtrasMenuValue,
    SetHelpMenuValue,
} from '../../../app/store/layout/actions';

const ActionMenus: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const layout = useSelector((state:AppState) => state.layout, shallowEqual);
    const canvas = useSelector((state:AppState) => state.canvas, shallowEqual);
    const sectionDefintions = GetMenuSectionDefinitions(dispatch, canvas, layout);


    return <>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="File"/> } 
            isActive={layout.actionMenus.isFileShowing}
            onBtnClick={() => { dispatch(SetFileMenuValue(!layout.actionMenus.isFileShowing)) }}
            sections={sectionDefintions["File"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Edit"/> } 
            isActive={layout.actionMenus.isEditShowing}
            onBtnClick={() => { dispatch(SetEditMenuValue(!layout.actionMenus.isEditShowing)) }}
            sections={sectionDefintions["Edit"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="View"/> }  
            isActive={layout.actionMenus.isViewShowing}
            onBtnClick={() => { dispatch(SetViewMenuValue(!layout.actionMenus.isViewShowing)) }}
            sections={sectionDefintions["View"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Extras"/> }  
            isActive={layout.actionMenus.isExtraShowing}
            onBtnClick={() => { dispatch(SetExtrasMenuValue(!layout.actionMenus.isExtraShowing)) }}
            sections={sectionDefintions["Extras"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Help"/> } 
            isActive={layout.actionMenus.isHelpShowing}
            onBtnClick={() => { dispatch(SetHelpMenuValue(!layout.actionMenus.isHelpShowing)) }}
            sections={sectionDefintions["Help"]}/>
    </>;
}

export default ActionMenus;