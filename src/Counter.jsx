import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

const Counter = React.forwardRef(({ counter, changeCount, remove, provided }, ref) => {

    const nodeRef = useRef();
    const [counterIn, setCounterIn] = useState(true);

    const getItemStyle = (style) => ({
        marginBottom: "1rem",
        ...style
    });

    return (
        <div
            ref={ref}
            {...provided.draggableProps}
            style={getItemStyle(provided.draggableProps.style)}
        >
            <CSSTransition classNames="counter-anim" nodeRef={nodeRef} in={counterIn} appear unmountOnExit onExited={() => remove(counter.id)} timeout={200}>

                <div className="counter" ref={nodeRef} style={{ backgroundColor: `hsl(${counter.hue}, 50%, 50%)` }}>
                    <div className="counter-drag-handle" {...provided.dragHandleProps}>
                        <FontAwesomeIcon icon="bars" size="2x" color="white" />
                    </div>
                    <div className="counter-name">{counter.name}</div>
                    <div className="counter-main">
                        <button className="inc-counter-btn" onClick={() => changeCount(counter.id, counter.count - 1)}>
                            <FontAwesomeIcon icon="minus" size="lg" color={`hsl(${counter.hue}, 50%, 50%)`} />
                        </button>
                        <span className="counter-count">{counter.count}</span>
                        <button className="dec-counter-btn" onClick={() => changeCount(counter.id, counter.count + 1)}>
                            <FontAwesomeIcon icon="plus" size="lg" color={`hsl(${counter.hue}, 50%, 50%)`} />
                        </button>
                    </div>
                    {/* <button className="settings-btn" onClick={() => { }}>
                    <FontAwesomeIcon icon="cog" size="lg" color={`hsl(${counter.hue}, 50%, 50%)`} />
                </button> */}
                    <button className="rm-counter-btn" onClick={() => setCounterIn(false)} style={{ backgroundColor: `hsl(${counter.hue}, 50%, 50%)` }}>
                        <FontAwesomeIcon icon="times" size="lg" color={'white'} />
                    </button>

                </div>
            </CSSTransition>
        </div>);
})

export default Counter;