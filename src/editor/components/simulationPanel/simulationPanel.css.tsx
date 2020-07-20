import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    position: 'absolute',
    right: 0,
    top: '96px',
    minWidth: '360px',
    width: '10vw',
    height: 'calc(100% - 96px)',
    borderLeft: '1px solid #ddd'
}

export const PanelToggle: CSS.Properties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '12px',
    height: '100%',
    backgroundColor: '#FBFBFB',
    zIndex: 30,
    borderRight: '1px solid #ddd',
    cursor: 'pointer'
}

export const ToggleBtn: CSS.Properties = {
    lineHeight: 'calc(100vh - 96px)',
    color: '#666',
    fontSize: '12px',
    textAlign: 'center'
}