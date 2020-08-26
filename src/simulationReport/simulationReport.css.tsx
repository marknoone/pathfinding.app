import CSS from 'csstype';

// Normal Report Styles
export const BaseStyle: CSS.Properties = {
    backgroundColor: '#f3f3f3',
    width: '100vw',
    height: '100vh',
    padding: '64px 0px',
    overflowY: 'auto'
}

export const DataContainer: CSS.Properties = {
    width: '60vw',
    minWidth: '640px',
    margin: "auto"
}

export const MetricContainer: CSS.Properties = {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    width: '100%',
    padding: '20px 0px',
    height: '25vh',
    minHeight: '280px',
    backgroundColor: 'white'
}

export const LIElem: CSS.Properties = {
    display: 'inline-block',
    width: '50%',
    padding: '10px 0px'
}
export const GraphContainer: CSS.Properties = {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    width: '100%',
    height: '440px',
    backgroundColor: 'white'
}

// Report Err styles.....
export const ReportErrBaseStyle: CSS.Properties = {
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