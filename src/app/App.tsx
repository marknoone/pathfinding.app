import React from 'react';
import { TopBar } from '../topbar';
import { EditorComponent } from '../editor';
import { ModalManager } from '../modalManager';
import { ToastPortal } from '../toastManager';

const App: React.FunctionComponent = (props) => {
  return <>
    <TopBar />
    <EditorComponent />
    <ModalManager />
    <ToastPortal /> 
  </>;
}

export default App;
