import React from 'react';
import { TopBar } from '../topbar';
import { HotKeys } from "react-hotkeys";
import { EditorComponent } from '../editor';
import { ModalManager } from '../modalManager';
import { ToastPortal } from '../toastManager';
import { shortcutMap, handlerMap } from './pkg/keyboardShortcuts';

const App: React.FunctionComponent = (props) => {
  return <HotKeys keyMap={shortcutMap} handlers={handlerMap}>
    <TopBar />
    <EditorComponent />
    <ModalManager />
    <ToastPortal /> 
  </HotKeys>;
}

export default App;
