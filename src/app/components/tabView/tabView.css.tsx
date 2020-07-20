import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    height: '100%'
}

export const TabHeaders: CSS.Properties = {
    display: 'inline-block',
    width: 'calc(100% - 12px)',
    height: '48px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #ddd'
}

export const TabHeader: CSS.Properties = {
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '42px',
    height: '100%',
    cursor: 'pointer',
    backgroundColor: '#fff',
}

export const TabHeaderActive: CSS.Properties = {
    borderBottom: '2px solid #ddd'
}

export const TabContent: CSS.Properties = {
    backgroundColor: '#f8f8f8',
    zIndex: 30,
    width: '100%',
    height: '100%'
}