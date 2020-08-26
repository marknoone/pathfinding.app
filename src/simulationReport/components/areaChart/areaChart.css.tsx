import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    position: 'relative',
    height: '100%'
}

export const HeaderBar: CSS.Properties = {
    position: 'relative',
    backgroundColor: '#d9d9d9',
    padding: '10px 20px',
    height: '48px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
    backgroundImage: 'linear-gradient(0deg, #d9d9d9 0%, #f6f2f2 74%)'
}

export const HeaderTitle: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: '#464646',
    marginBottom: '4px',
    margin: 0,
    lineHeight: '28px'
}

export const GraphContainer: CSS.Properties = {
    width: '100%',
    height: '310px'
}

export const MetricsContainer: CSS.Properties = {
    position: 'absolute',
    height: '84px',
    width: '100%',
    bottom: 0,
    left: 0
}

export const Metric: CSS.Properties = {
    display: 'inline-block',
    height: '100%',
    padding: '13px 20px'
}

export const MetricValue: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "18px",
    fontWeight: 500,
    color: '#464646'
}

export const MetricTitle: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: '#aaa',
    marginBottom: '4px'
}