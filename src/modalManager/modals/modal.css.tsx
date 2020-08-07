import CSS from 'csstype';

export const BaseModalStyle: CSS.Properties = {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '6px',
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.45)'
}

export const ModalTitleBar: CSS.Properties = {
    position: 'relative',
    borderBottom: '1px solid #ccc',
    borderRadius: '6px 6px 0px 0px',
    padding: '4px 10px',
    height: '64px',
    width: '100%'
}

export const ModalTitle: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '54px',
    display: 'inline-block',
    paddingLeft: '16px'
}

export const ModalCloseIcon: CSS.Properties = {
    display: 'inline-block',
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    outline: 0,
    color: '#464646',
    fontSize: '24px',
    fontWeight: 600
}

export const ModalFooter: CSS.Properties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTop: '1px solid #ccc',
    borderRadius: '0px 0px 6px 6px',
    padding: '4px 10px',
    height: '64px',
    width: '100%'
}

export const ModalBtn: CSS.Properties = {
    position: 'absolute',
    top: '10px',
    padding: '6px 24px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    border: 'none',
    boxShadow: '0px 1px rgba(0, 0, 0, 0.35)'
}

export const ModalSaveBtn: CSS.Properties = {
    right: '110px',
    backgroundColor: '#0abde3',
}

export const ModalCloseBtn: CSS.Properties = {
    right: '10px',
    backgroundColor: '#ee5253',
}