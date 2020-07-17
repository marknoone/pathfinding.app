import React from 'react';
import { TopBar } from '../topbar';
import { EditorComponent } from '../editor';
import { ModalManager } from '../modalManager';
import { ToastManager } from '../toastManager';

const App: React.FunctionComponent = (props) => {
  return <>
    <TopBar />
    <EditorComponent />
    {/* 
      <ModalManager />
      <ToastManager /> 
    */}
  </>;
}

export default App;
