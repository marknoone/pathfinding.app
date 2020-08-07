import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../actions';
import {  BaseModalStyle, ModalTitleBar, ModalTitle, ModalCloseIcon,
    ModalBody, ModalFooter, ModalBtn, ModalCloseBtn, ModalSaveBtn } from './modal.css';

type ModalProps = { 
    title: string; 

    render: () => JSX.Element; 
    primaryAction?: {
        func: () => void; 
        name: string;
    } 
}

const Modal: React.FunctionComponent<ModalProps> = ({ title, primaryAction, render }) => {
    const dispatch = useDispatch();
    return (
      <div style={{...BaseModalStyle, width: '20vw', height: '20vh'}}>
        <div style={ModalTitleBar}>
          <h5 style={ModalTitle}>{title}</h5>
          <button style={ModalCloseIcon} type="button" aria-label="Close" onClick={() => dispatch(closeModal())}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={ModalBody}>
          {render()}
        </div>
        <div style={ModalFooter}>
          { 
              primaryAction? (
                <button type="button" style={{...ModalBtn, ...ModalSaveBtn}} onClick={() => primaryAction.func()}>
                    {primaryAction.name}
                </button>
              ): null
          }
          <button type="button" style={{...ModalBtn, ...ModalCloseBtn}} onClick={() => dispatch(closeModal())}>Close</button>
        </div>
      </div>
    );
}

export default Modal;
