import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {}

export const SimSection: CSS.Properties = {
    padding: '4px 15px',
}

export const SimOption: CSS.Properties = {
    padding: '8px 0px',
}

export const SimText: CSS.Properties = {
    fontFamily: "'Open-Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: '#464646',
    margin: '0px 0px 5px 0px',
    display: 'inline-block'
}

export const InputText: CSS.Properties = {
    borderRadius: '6px',
    border: '1px solid #ddd',
    padding: '5px 5px',
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    width: 'calc(100% - 8px)',
}

export const SimOptionInput: CSS.Properties = {
    ...InputText, 
    position: 'absolute',
    right: '8px',
    width: '240px', 
    marginLeft: '8px', 
}

export const SimHeader: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    color: '#464646',
    margin: '0px 0px 5px 0px'
}

export const SimBtn: CSS.Properties = {
    display: 'block',
    width: '200px',
    height: '32px',
    lineHeight: '28px',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: '6px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.35)',
    margin: 'auto',
    marginBottom: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 0
}

export const SimPlaybackCtrl: CSS.Properties = {
    textAlign: 'center'
}

export const SimPlaybackCtrlList: CSS.Properties = {
    listStyle: 'none',
    padding: 0,
    margin: 0
}

export const SimPlaybackCtrlElem: CSS.Properties = {
    display: 'inline-block',
    fontSize: '18px',
    color: '#464646',
    padding: '8px 10px',
    cursor: 'pointer'
}