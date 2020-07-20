import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    position: 'relative',
    display: 'inline-block'
}

export const MenuBtn: CSS.Properties = {
    border: 'none',
    outline: 0,
    fontFamily: "'Open-sans', sans-serif",
    color: '#000',
    cursor: 'pointer',
    padding: '2px 2px',
    fontSize: '14px'
}

export const MenuContainer: CSS.Properties = {
    position: 'absolute',
    top: '30px',
    left: 0,
    minWidth: '280px',
    backgroundColor: '#Fefefe',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.4)',
    borderRadius: '4px',
    padding: '0px 4px',
    zIndex: 45
}

export const DropdownSection: CSS.Properties = {
    margin: 0,
    padding: '4px 0px',
    listStyle: 'none',
    borderBottom: '1px solid #ddd'
}

export const DropdownEntry: CSS.Properties = {
    cursor: 'pointer',
    position: 'relative',
}

export const EntryToggleIcon: CSS.Properties = {
    display: 'inline-block',
    width: '28px',
    height: '28px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#576574'
}

export const EntryTitle: CSS.Properties = {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    fontWeight: 400,
    fontSize: '13px',
    fontFamily: "'Open-sans', sans-serif",
    color: '#000',
    margin: 0,
    lineHeight: '28px',
    paddingLeft: '4px'
}

export const EntryShortcut: CSS.Properties = {
    display: 'inline-block',
    fontWeight: 400,
    fontSize: '13px',
    fontFamily: "'Open-sans', sans-serif",
    color: '#b2bec3',
    margin: 0,
    paddingRight: '8px',
    float: 'right',
    lineHeight: '28px'
}

