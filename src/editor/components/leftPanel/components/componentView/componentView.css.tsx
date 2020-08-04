import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
}

export const CategoryEntry: CSS.Properties = {
    width: '100%',
    height: '32px',
    backgroundColor: '#fff',
    padding: '2px 8px',
    borderBottom: '1px solid #dedede'
}

export const CollapseIcon: CSS.Properties = {
    display: 'inline-block',
    width: '16px',
    textAlign: 'center',
    color: '#464646',
    fontSize: '16px'
}

export const CategoryName: CSS.Properties = {
    display: 'inline-block',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    color: '#464646',
    paddingLeft: '8px'
}

export const AddIcon: CSS.Properties = {
    display: 'inline-block',
    fontSize: '14px',
    float: 'right',
    color: '#999',
    paddingRight: '16px',
    paddingTop: '2px',
    cursor: 'pointer'
}

export const CategoryChildren: CSS.Properties = {
    padding: '0px 0px'
}

export const CCChild: CSS.Properties = {
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    padding: '2px 0px 2px 20px',
    color: 'rgb(102, 102, 102',
    cursor: 'pointer'
}