import CSS from 'csstype';

export const ReportBaseStyle: CSS.Properties = {
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#fefefe',
    paddingTop: '360px'
}   

export const ReportErrContainer: CSS.Properties = {
    position: 'relative',
    width: '560px',
    height: '480px',
    margin: 'auto'
};

export const BugIcon: CSS.Properties = {
    position: 'absolute',
    top: '60px',
    left: '240px',
    fontSize: '64px',
    color: '#464646'
};

export const DesktopIcon: CSS.Properties = {
    position: 'absolute',
    top: '24px',
    left: '200px',
    fontSize: '128px',
    color: '#464646'
};

export const ErrTitle: CSS.Properties = {
    position: 'absolute',
    top: '240px',
    left: '0px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "24px",
    fontWeight: 600,
    color: '#464646'
};

export const ErrDesc: CSS.Properties = {
    position: 'absolute',
    top: '280px',
    left: '0px',
    textAlign: 'left',
    fontFamily: "'Open-sans', sans-serif",
    fontSize: "16px",
    fontWeight: 500,
};