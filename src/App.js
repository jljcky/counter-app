import { useState, useEffect } from 'react';
import './App.css';
import Counter from './Counter';
import {v4 as uuidv4} from 'uuid';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGreaterThan} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [counters, setCounters] = useState([]);
  const [counterSettings, setCounterSettings] = useState({name: "", count: 0});

  useEffect(() => {
    let stored = localStorage.getItem('counters');
    if (stored) {
      setCounters(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('counters', JSON.stringify(counters))
  }, [counters]);

  const createCounter = (e) => {
    e.preventDefault();
    setCounters((counters) => ([...counters, 
      {
        name: counterSettings.name ? counterSettings.name : "New Counter", 
        id: uuidv4(), 
        count: parseInt(counterSettings.count),
        hsl: {
          hue: Math.floor(Math.random() * 360),
          saturation: '50%',
          lightness: '50%',
        }
       }]) );
    setCounterSettings({name: '', count: 0})
  }

  const removeCounter = (id) => {
    setCounters((counters) => (counters.filter(counter => counter.id !== id)));
  }

  const changeCounter = (id, value) => {
    let newList = [...counters];
    newList.forEach(counter => {
      if (counter.id === id) {
        counter.count = value;
      }
    });
    setCounters(newList);

  };

  const changeSettings = (e, type) => {
    setCounterSettings(counterSettings => ({...counterSettings, [type]: e.target.value}));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Counter App</h2>
      </header>

      <div id="counters-section">
        <div id="create-counter">
          <h3 id="create-counter-title" >Create a counter to get started</h3>
          <form onSubmit={(e) => createCounter(e)}>
            <input id="counter-name-setter" type="text" value={counterSettings.name} placeholder="Name..." onChange={(e) => changeSettings(e, 'name')}></input>
            <input id="counter-count-setter" type="number" value={counterSettings.count} placeholder="Count..." onChange={(e) => changeSettings(e, 'count')}></input>
            <button id="create-counter-btn">
              <FontAwesomeIcon icon={faGreaterThan}  size="lg"/>
            </button>
          </form>
        </div>

        <div id="counters-list">
          {counters.length ? 
          counters.map((counter) => (
            <Counter key={counter.id} counter={counter} change={changeCounter} remove={removeCounter}/>
          )) 
          : 
          <div id="counters-list-empty">
            <span>No counters at the moment. Create one now!</span>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
