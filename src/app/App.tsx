import React from 'react';
import { TopBar } from '../topbar';
import { HotKeys } from "react-hotkeys";
import { useDispatch } from 'react-redux';
import { EditorComponent } from '../editor';
import { ToastPortal } from '../toastManager';
import { ModalManager } from '../modalManager';
import { SimulationReport } from '../simulationReport'
import { shortcutMap, handlerMap } from './pkg/keyboardShortcuts';
import { SimulationBakingScreen } from '../simulationBakingScreen';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();
  return <Router>
      <Switch>
        <Route exact path="/">
          <HotKeys keyMap={shortcutMap} handlers={handlerMap(dispatch)}>
            <TopBar />
            <EditorComponent />
            <ModalManager />
            <ToastPortal /> 
            <SimulationBakingScreen />
          </HotKeys>
        </Route>
        <Route path="/report">
          <SimulationReport />
        </Route>
      </Switch>
    </Router>;
}

export default App;
