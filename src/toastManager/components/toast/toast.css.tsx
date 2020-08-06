import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    padding: '10px 15px',
    borderRadius: '6px',
    width: "320px",
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.3)'
}

export const ToastIcon: CSS.Properties = {
    textAlign: 'center',
    fontSize: '20px',
    display: 'inline-block',
    width: "10%",
}

export const ToastMessage: CSS.Properties = {
    width: "90%",
    fontFamily: "'Open-sans', sans-serif",
    display: 'inline-block',
    fontSize: "16px",
    fontWeight: 400,
    padding: "4px 8px",
    margin: 0
}
