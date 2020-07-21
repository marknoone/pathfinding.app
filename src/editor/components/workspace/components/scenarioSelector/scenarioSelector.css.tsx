import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
    border: '1px solid #e5e5e5'
}

export const ScenarioIcon: CSS.Properties = {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '0px 12px',
    color: 'gray',
    borderRight: '1px solid #e5e5e5',
    cursor: 'pointer',
    height: '100%',
    lineHeight: '38px'
}

export const ScenarioList: CSS.Properties = {
    display: 'inline-block',
    listStyle: 'none',
    margin: 0,
    padding: 0
}

export const ScenarioListElem: CSS.Properties = {
    display: 'inline-block',
    borderRight: '1px solid #e5e5e5',
    padding: '0px 50px',
    cursor: 'pointer',
    color: 'gray',
}

export const ScenarioListElemActive: CSS.Properties = {
    backgroundColor: 'white',
    cursor: 'default',
    color: '#079992',
}

export const ScenarioTitle: CSS.Properties = {
    margin: 0,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: 'inherit',
    lineHeight: '38px'
}