import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../actions';
import {  BaseModalStyle, ModalTitleBar, ModalTitle, ModalCloseIcon,
    ModalFooter, ModalBtn, ModalCloseBtn, ModalSaveBtn } from './modal.css';

type ModalProps = { 
    title: string; 
    size?: {w: string, h:string}

    render: () => JSX.Element; 
    primaryAction?: {
        func: () => void; 
        name: string;
    } 
}

const Modal: React.FunctionComponent<ModalProps> = ({ title, size, primaryAction, render }) => {
    const dispatch = useDispatch();
    return (
      <div style={{...BaseModalStyle, width: size?size.w:'20vw', height: size?size.h:'20vh'}}>
        <div style={ModalTitleBar}>
          <h5 style={ModalTitle}>{title}</h5>
          <button style={ModalCloseIcon} type="button" aria-label="Close" onClick={() => dispatch(closeModal())}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={{width: '100%', height: size?`calc(${size.h} - 128px)`:"calc(20vh - 128px)"}}>
          {render()}
        </div>
        <div style={ModalFooter}>
          { 
              primaryAction? (
                <button type="button" style={{...ModalBtn, ...ModalSaveBtn}} onClick={() => {
                  primaryAction.func(); 
                  dispatch(closeModal())}
                }>
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
