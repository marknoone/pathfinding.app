import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    border: '1px solid #ddd'
}

export const ArrayToolbar: CSS.Properties = {
    position: 'relative',
    height: '32px',
    padding: '2px 5px',
    borderBottom: '1px solid #ddd'
} 

export const ViewTitle: CSS.Properties = {
    display: 'inline-block',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    fontSize: '14px',
    color: '#222',
    margin: 0
}

export const AddIcon: CSS.Properties = {
    display: 'inline-block',
    position: 'absolute',
    top: '5px',
    right: '5px',
    marginRight: '3px',
    color: '#464646',
    fontSize: '14px',
    cursor: 'pointer'
}

export const ElementList: CSS.Properties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
} 

export const Element: CSS.Properties = {
    position: 'relative',
    padding: '4px 0px'
} 

export const ElemIcons: CSS.Properties = {
    display: 'inline-block',
    position: 'absolute',
    top: '4px',
    right: 0,
    cursor: 'pointer'
} 

export const ElementName: CSS.Properties = {
    display: 'inline-block',
    fontFamily: "'Open-sans', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    color: '#464646',
    paddingLeft: '8px',
    margin: 0
} 

export const ElementNumber: CSS.Properties = {
    display: 'inline-block',
    fontFamily: "'Open-sans', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    color: '#222',
    width: '16px',
    textAlign: 'center',
    margin: 0
} 