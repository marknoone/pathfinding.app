import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    backgroundColor: '#f8f8f8', 
    width: '100%', 
    height: 'calc(100vh - 96px)'
}

export const WorkspaceCanvas: CSS.Properties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 15
}