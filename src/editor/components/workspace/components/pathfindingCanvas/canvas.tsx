import React from 'react';

type PureCanvasProps = {
    width: number
    height: number
    contextRef: (c: CanvasRenderingContext2D) => void
}

const PureCanvas: React.FunctionComponent<PureCanvasProps> = React.memo((props) => {
    return <div style={{}}>
        <canvas
            width={props.width}
            height={props.height}
            ref={ node => { if(node){
                var ctx = node.getContext("2d");
                if(ctx)
                    props.contextRef(ctx)
            }}}
        />
    </div>;
}); // Returns true to guarantee no re-render

export default PureCanvas;