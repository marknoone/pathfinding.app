import React from 'react';
import { TopBar } from '../topbar';
import { HotKeys } from "react-hotkeys";
import { EditorComponent } from '../editor';
import { ModalManager } from '../modalManager';
import { ToastPortal } from '../toastManager';
import { shortcutMap, handlerMap } from './pkg/keyboardShortcuts';
import { useDispatch } from 'react-redux';

const App: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();
  return <HotKeys keyMap={shortcutMap} handlers={handlerMap(dispatch)}>
    <TopBar />
    <EditorComponent />
    <ModalManager />
    <ToastPortal /> 
  </HotKeys>;
}

export default App;
