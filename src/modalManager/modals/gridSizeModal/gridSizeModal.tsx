import CSS from 'csstype';
import Modal from '../modal';
import React, { useState } from 'react';
import { AppState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { SetCanvasSize } from '../../../editor/components/workspace/components/pathfindingCanvas/actions';

const Label: CSS.Properties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px',
    display: 'inline-block'
}

const MsgStyle: CSS.Properties = {
    fontFamily: "'Open-sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    color: '#464646',
};

const Input: CSS.Properties = {
    borderRadius: '6px',
    border: '1px solid #ddd',
    padding: '5px 5px',
    fontFamily: "'Open-sans', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    width: '100px',
    marginLeft: '4px'
}

const GridSizeModal: React.FunctionComponent = (props) => {
    const dispatch = useDispatch();
    const canvasSize = useSelector((s:AppState) => s.canvas.canvasSize);
    const [size, setSize] = useState<number[]>(canvasSize);

    return  <Modal title="Edit Canvas Grid Size"
        size={{w: '480px', h:'240px'}}
        primaryAction={{
            name: "Save",
            func: () => dispatch(SetCanvasSize(size[0], size[1]))
        }}
        render={() => <div style={{padding: '8px 16px'}}>
                <p style={MsgStyle}>Enter a grid size for the canvas.</p>
                <p style={Label}>X:</p>
                <input style={Input} type="text" value={size[0]} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num = parseInt(e.target.value, 10);
                        if(!isNaN(num)) setSize([num, size[1]]);
                    }}/>
                <p style={{...Label, marginLeft: '24px'}}>Y:</p>
                <input style={Input} type="text" value={size[1]} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const num = parseInt(e.target.value, 10);
                        if(!isNaN(num)) setSize([size[0], num]);
                    }} />
            </div>
    }/>  
}
    
export default GridSizeModal;