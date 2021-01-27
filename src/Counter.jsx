import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

const Counter = React.forwardRef(({ counter, changeCount, remove, provided }, ref) => {

    const nodeRef = useRef();
    const [counterIn, setCounterIn] = useState(true);

    const getItemStyle = (style) => ({
        display: 'flex',
        marginBottom: "1rem",
        ...style
    });

    // useEffect(() => {
    //     setCounterIn(true);
    // }, [])

    return (
        <div
            ref={ref}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(provided.draggableProps.style)}
        >
            <CSSTransition classNames="counter-anim" nodeRef={nodeRef} in={counterIn} appear unmountOnExit onExited={() => remove(counter.id)} timeout={200}>

                <div className="counter" ref={nodeRef} style={{ backgroundColor: `hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})` }}>
                    {/* <div >
                        <FontAwesomeIcon icon="bars" size="2x" color="white" />
                    </div> */}
                    <span className="counter-name">{counter.name}</span>
                    <div className="counter-main">
                        <button className="inc-counter-btn" onClick={() => changeCount(counter.id, counter.count - 1)}>
                            <FontAwesomeIcon icon="minus" size="lg" color={`hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})`} />
                        </button>
                        <span className="counter-count">{counter.count}</span>
                        <button className="dec-counter-btn" onClick={() => changeCount(counter.id, counter.count + 1)}>
                            <FontAwesomeIcon icon="plus" size="lg" color={`hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})`} />
                        </button>
                    </div>
                    {/* <button className="settings-btn" onClick={() => { }}>
                    <FontAwesomeIcon icon="cog" size="lg" color={`hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})`} />
                </button> */}
                    <button className="rm-counter-btn" onClick={() => setCounterIn(false)} style={{ backgroundColor: `hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})` }}>
                        <FontAwesomeIcon icon="times" size="lg" color={'white'} />
                    </button>

                </div>
            </CSSTransition>
        </div>);
})

export default Counter;