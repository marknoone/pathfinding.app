import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    position: 'relative'
}

export const SelectionValue: CSS.Properties = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    padding: '5px 10px',
    width: '325px',
    borderRadius: '6px',
    height: '32px',
    cursor: 'pointer'
}

export const SelectionPElem: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: '#464646'
}

export const OptionsContainer: CSS.Properties = {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#ffffff',
    position: 'absolute',
    borderRadius: '6px',
    top: '24px',
    left: 0,
    padding: '5px',
    width: '260px',
    zIndex: 45
}

export const OptionList: CSS.Properties = {
    listStyle: 'none',
    padding: 0,
    margin: 0
}

export const OptionListElem: CSS.Properties = {
    padding: '5px 0px 5px 15px',
    cursor: 'pointer'
}