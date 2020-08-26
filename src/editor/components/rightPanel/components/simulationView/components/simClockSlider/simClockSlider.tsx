import React, { useState, useEffect, useRef } from 'react';
import CSS from 'csstype';
import './slider.css';

type Coord = { x: number, y:number }
type SimClockProps = { value: number; range: number[]; onChange: (e: number) => void };
const SimClockSlider: React.FunctionComponent<SimClockProps> = (props) => {
    const [value, setValue] = useState(props.value);
    const [tooltip, setTooltip] = useState<Coord | null>(null);
    const [loc, setLoc] = useState<number[]>([0, 0]);
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newArr = [ rect.left, rect.top ];

        if(JSON.stringify(newArr) !==JSON.stringify(loc)) setLoc(newArr);
    }, [loc])

    return <div ref={containerRef}> 
        <input type="range" min={props.range[0]} max={props.range[1]} value={value}
            className="sim-slider" 
            onMouseUp={(e: React.MouseEvent<HTMLInputElement>) => {
                setTooltip(null);
                props.onChange(value) 
            }}
            onMouseDown={(e: React.MouseEvent<HTMLInputElement>) => 
                setTooltip({x: e.clientX - loc[0], y: e.clientY - loc[1]})}
            onMouseMove={(e: React.MouseEvent<HTMLInputElement>) => {
                if(tooltip !== null) {
                    setTooltip({x: e.clientX - loc[0], y: e.clientY - loc[1]});
                }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = parseInt(e.target.value, 10);
                if(!isNaN(val)) setValue(val);
            }}/>
        {
            !tooltip?null:
            <div style={{
                position: tooltip?'absolute':'static',
                left: tooltip?tooltip.x-170: 0,
                zIndex: 120,
                width: 170,
                textAlign: 'center',
                marginTop: '10px',
                backgroundColor: '#fefefe',
                borderRadius: '6px',
                padding: '10px 15px',
                boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
                    0px 1px 1px 0px rgba(0,0,0,0.14),
                    0px 1px 3px 0px rgba(0,0,0,0.12)`,
            }}>
                <p style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#464646',
                    margin: 0,
                    padding: 0,
                    width: '100%'
                }}>
                    {`${Math.floor(value/60/60)} :
                      ${Math.floor((value/60)%60)} :
                      ${value % 60} (${value})`}
                </p>
            </div>
        }
    </div>
};

export default SimClockSlider;