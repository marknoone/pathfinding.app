import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    width: '100%',
    height: '32px',
    borderBottom: '1px solid #dedede',
    backgroundColor: '#FBFBFB',
    padding: '0px 8px'
}

export const ToolbarSection: CSS.Properties = {
    display: 'inline-block',
    borderRight: '1px solid #dedede',
    height:'26px',
    margin: '2px 0px',
    padding: '0px 4px'
}

export const ToolbarBtnList: CSS.Properties = {
    listStyle: 'none',
    margin: 0,
    padding: '0px 8px'
}

export const ToolbarBtnListElem: CSS.Properties = {
    display: 'inline-block',
    width: '26px',
    height: '26px',
    textAlign: 'center',
    margin: '0px 4px',
    cursor: 'pointer',
}

export const ToolbarBtn: CSS.Properties = {
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 0,
    color: '#999'
}

export const WindowInteractionButtons: CSS.Properties = {
    float: 'right',
    padding: '2px 0px'
}