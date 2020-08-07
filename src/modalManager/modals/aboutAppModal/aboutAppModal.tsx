import React from 'react';
import Modal from '../modal';
import CSS from 'csstype';

const Container: CSS.Properties = {}
const PStyle: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    color: '#464646',
}

const AboutAppModal: React.FunctionComponent = (props) => 
    <Modal title={"About Our App"} size={{w: '720px', h: '540px'}}
        render={() =>{
            return <div style={Container}>
                <p style={PStyle}>{`
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio lectus, lacinia nec lorem ut,  
                    convallis maximus sapien. Cras a libero et odio commodo efficitur vel non neque. Donec sodales eget 
                    nisi nec aliquam. Pellentesque nec leo nisl. Sed vel felis ut nisl maximus facilisis id eget lectus. 
                    Sed vel ex eu ante dapibus pharetra eu a leo. Aenean luctus, libero non feugiat finibus, ante nulla 
                    blandit tellus, ut blandit erat eros vitae ante. Cras laoreet arcu risus, malesuada venenatis velit 
                    malesuada vitae. Quisque quis posuere lectus. Fusce at nulla quis urna blandit efficitur. Integer 
                    auctor blandit lectus, eu eleifend magna ultricies at. Vestibulum blandit ipsum at magna tempus 
                    auctor. Etiam efficitur, ipsum sed porta vestibulum, nisl justo laoreet magna, pretium faucibus nunc 
                    ipsum quis nibh. Morbi aliquam mi non aliquam porta. Aenean at malesuada sem, nec condimentum metus. 
                    Aenean bibendum massa fringilla, lacinia elit in, laoreet ipsum.
                `}</p>
                <p style={PStyle}>
                {`
                    Phasellus eget orci placerat, pulvinar neque vitae, venenatis lacus. Quisque urna turpis, consequat 
                    sed pharetra vitae, suscipit quis elit. Nulla congue augue sed pharetra aliquet. Cras vel lacus 
                    consequat, venenatis nisl quis, pharetra leo. Pellentesque habitant morbi tristique senectus et 
                    netus et malesuada fames ac turpis egestas. Nulla non vehicula odio, ut sodales erat. Sed elementum 
                    diam tortor. Vivamus ut leo nunc. Quisque lobortis posuere tortor, sed convallis orci suscipit non. 
                    Morbi sed elit justo. Suspendisse potenti. Phasellus a nisi lorem.
                `}</p>
            </div>;
        }
    }/>
    
export default AboutAppModal;