import CSS from 'csstype';

export const BaseStyle: CSS.Properties = {
    position: 'relative',
    height: '100%'
}

export const HeaderBar: CSS.Properties = {
    position: 'relative',
    zIndex: 5,
    backgroundColor: '#d9d9d9',
    padding: '10px 20px',
    height: '48px',
    boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
        0px 1px 1px 0px rgba(0,0,0,0.14),
        0px 1px 3px 0px rgba(0,0,0,0.12)`,
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