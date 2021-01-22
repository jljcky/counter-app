import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Counter = ({ counter, changeCount, remove }) => {

    return (
        <div className="counter" draggable style={{ backgroundColor: `hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})` }}>
            {/* <div>
                <FontAwesomeIcon icon="bars" size="lg" color="white" />
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
            <button className="rm-counter-btn" onClick={() => remove(counter.id)} style={{ backgroundColor: `hsl(${counter.hsl.hue}, ${counter.hsl.saturation}, ${counter.hsl.lightness})` }}>
                <FontAwesomeIcon icon="times" size="lg" color={'white'} />
            </button>
        </div>);
}

export default Counter;