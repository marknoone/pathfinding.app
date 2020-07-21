import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    backgroundColor: '#f8f8f8', 
    width: '100%', 
    height: 'calc(100% - 38px)',
    overflowX: 'auto',
    overflowY: 'auto',
}

export const WorkspaceCanvas: CSS.Properties = {
    position: 'relative',
    width: '150%',
    height: '150%',
    zIndex: 15
}