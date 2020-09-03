import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    background: 'rgba(0, 0, 0, 0.75)',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: 200,
    left: 0,
    top: 0,
}

export const LoadingContainer: CSS.Properties = {
    boxShadow: '0px 1px 6px 2px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    padding: '10px 15px',
    width: '330px',
    height: '380px',
    margin: 'auto',
    marginTop: '35vh',
    backgroundColor: '#e8e8e8',
    borderRadius: '6px',
}   

export const LoadingTextContainer: CSS.Properties = {
    position: 'absolute',
    bottom: '32px',
    width: 'calc(100% - 30px)',
    textAlign: 'center'
}

export const LoadingText: CSS.Properties = {
    fontFamily: "'Montserrat', open-sans",
    fontWeight: 600,
    fontSize: '14px',
    color: '#464646',
    width: '100%',
    textAlign: 'center',
    marginBottom: '4px'
}

export const CancelBtn: CSS.Properties = {
    padding: '8px 26px',
    marginTop: '16px',
    backgroundColor: '#0abde3',
    color: 'white',
    fontFamily: "'Montserrat', open-sans",
    fontWeight: 600,
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.4)',
}