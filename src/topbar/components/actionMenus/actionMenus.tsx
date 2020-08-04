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
    const menuVals = useSelector((state:AppState) => state.layout.actionMenus, shallowEqual)
    const sectionDefintions = GetMenuSectionDefinitions(dispatch);

    return <>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="File"/> } 
            isActive={menuVals.isFileShowing}
            onBtnClick={() => { dispatch(SetFileMenuValue(!menuVals.isFileShowing)) }}
            sections={sectionDefintions["File"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Edit"/> } 
            isActive={menuVals.isEditShowing}
            onBtnClick={() => { dispatch(SetEditMenuValue(!menuVals.isEditShowing)) }}
            sections={sectionDefintions["Edit"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="View"/> }  
            isActive={menuVals.isViewShowing}
            onBtnClick={() => { dispatch(SetViewMenuValue(!menuVals.isViewShowing)) }}
            sections={sectionDefintions["View"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Extras"/> }  
            isActive={menuVals.isExtraShowing}
            onBtnClick={() => { dispatch(SetExtrasMenuValue(!menuVals.isExtraShowing)) }}
            sections={sectionDefintions["Extras"]}/>
        <DropdownMenu 
            render={ () => <DropdownMenuTextBtn title="Help"/> } 
            isActive={menuVals.isHelpShowing}
            onBtnClick={() => { dispatch(SetHelpMenuValue(!menuVals.isHelpShowing)) }}
            sections={sectionDefintions["Help"]}/>
    </>;
}

export default ActionMenus;