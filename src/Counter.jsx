import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Counter = ({ counter, change, remove }) => {
    return (<div className="counter" style={{ backgroundColor: `hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})` }}>
        <span className="counter-name">{counter.name}</span>
        <div className="counter-main">
            <button className="inc-counter-btn" onClick={() => change(counter.id, counter.count - 1)}>
                <FontAwesomeIcon icon="minus" size="lg" color={`hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})`} />
            </button>
            <span className="counter-count">{counter.count}</span>
            <button className="dec-counter-btn" onClick={() => change(counter.id, counter.count + 1)}>
                <FontAwesomeIcon icon="plus" size="lg" color={`hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})`} />
            </button>
        </div>
        <button className="rm-counter-btn" onClick={() => remove(counter.id)}>
            <FontAwesomeIcon icon="times" size="lg" color={`hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})`} />
        </button>
    </div>);
}

export default Counter;