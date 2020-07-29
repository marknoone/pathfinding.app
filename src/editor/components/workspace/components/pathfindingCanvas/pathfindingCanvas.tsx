import React, { useMemo, useState, useEffect } from 'react';
import PureCanvas from './canvas';
import {
    BaseStyle,
    WorkspaceCanvas
} from './pathfindingCanvas.css';

const PathfindingCanvas: React.FunctionComponent = (props) => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
    const [rAF, setrAF] = useState<number>(0)

    const saveContext = (ctx: CanvasRenderingContext2D) => {
        setCtx(ctx);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);
    }

    const updateAnimationState = () => {
        if(!ctx)
            return
        
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(0, 0, 150, 75)
    }

    // useEffect(() => {
    //     return () => {
    //         cancelAnimationFrame(rAF);
    //     }
    // });
    
    return <div style={BaseStyle}>
        <div style={{}}>
            <PureCanvas width={300} height={300} contextRef={saveContext}/>
        </div>
    </div>;
}
    

export default PathfindingCanvas;