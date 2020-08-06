import React from 'react';
import {  BaseModalStyle, ModalTitleBar, ModalTitle, ModalCloseIcon,
    ModalBody, ModalFooter, ModalBtn, ModalCloseBtn, ModalSaveBtn } from './modal.css';

type ModalProps = { 
    title: string; 
    
    saveAction: () => void;  
    closeAction: () => void;  
    render: () => JSX.Element; 
}

const Modal: React.FunctionComponent<ModalProps> = ({ title, render, closeAction, saveAction }) => {
    return (
      <div style={{...BaseModalStyle, width: '20vw', height: '20vh'}}>
        <div style={ModalTitleBar}>
          <h5 style={ModalTitle}>{title}</h5>
          <button style={ModalCloseIcon} type="button" aria-label="Close" onClick={() => closeAction()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={ModalBody}>
          {render()}
        </div>
        <div style={ModalFooter}>
          <button type="button" style={{...ModalBtn, ...ModalSaveBtn}} onClick={() => saveAction()}>Save</button>
          <button type="button" style={{...ModalBtn, ...ModalCloseBtn}} onClick={() => closeAction()}>Close</button>
        </div>
      </div>
    );
}

export default Modal;
