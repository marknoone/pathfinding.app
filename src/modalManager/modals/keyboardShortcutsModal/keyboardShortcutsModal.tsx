import React from 'react';
import Modal from '../modal';
import CSS from 'csstype';

const LiElem: CSS.Properties = {
    margin: 0,
    padding: 0,
    borderBottom: '1px solid #dedede'
}

const ShortcutEntry: CSS.Properties = {
    padding: '15px 15px',
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    display: 'inline-block',
    width: '50%',
    color: '#464646',
    margin: 0
}

const Shortcut: CSS.Properties = {
    color: '#999',
    float: 'right',
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 500,
}

const KeyboardShortcutsModal: React.FunctionComponent = (props) => {
    return  <Modal title="Keyboard Shortcuts"
        size={{w: '640px', h: '335px'}}
        render={() =>{
            return <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={LiElem}>
                    <p style={{...ShortcutEntry, borderRight: '1px solid #dedede'}}> 
                        Undo <span style={Shortcut}>CTRL + Z</span>
                    </p>
                    <p style={ShortcutEntry}> Redo <span style={Shortcut}>CTRL + Y</span></p>
                </li>
                <li style={LiElem}>
                    <p style={{...ShortcutEntry, borderRight: '1px solid #dedede'}}> 
                        Undo <span style={Shortcut}>CTRL + Z</span>
                    </p>
                    <p style={ShortcutEntry}> Redo <span style={Shortcut}>CTRL + Y</span></p>
                </li>
                <li style={LiElem}>
                    <p style={{...ShortcutEntry, borderRight: '1px solid #dedede'}}> 
                        Undo <span style={Shortcut}>CTRL + Z</span>
                    </p>
                    <p style={ShortcutEntry}> Redo <span style={Shortcut}>CTRL + Y</span></p>
                </li>
                <li style={LiElem}>
                    <p style={{...ShortcutEntry, borderRight: '1px solid #dedede'}}> 
                        Undo <span style={Shortcut}>CTRL + Z</span>
                    </p>
                    <p style={ShortcutEntry}> Redo <span style={Shortcut}>CTRL + Y</span></p>
                </li>
            </ul>;
        }
    }/>  
}
    
export default KeyboardShortcutsModal;