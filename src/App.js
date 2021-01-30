import { useState, useEffect } from 'react';
import './App.css';
import Counter from './Counter';
import {v4 as uuidv4} from 'uuid';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGreaterThan} from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const MAX_COUNT = 999999;
const MIN_COUNT = -999999;

function App() {
  const [counters, setCounters] = useState([]);
  const [counterSettings, setCounterSettings] = useState({name: "", count: 0});

  useEffect(() => {
    let stored = localStorage.getItem('counters');
    if (stored) {
      setCounters(JSON.parse(stored));
    }
    // let currentVersion = localStorage.getItem('version');
    // if (currentVersion) {
    //   if (currentVersion === process.env.REACT_APP_VERSION) {
    //     let stored = localStorage.getItem('counters');
    //     if (stored) {
    //       setCounters(JSON.parse(stored));
    //     }
    //   } else {
    //     localStorage.clear();
    //     localStorage.setItem('version', process.env.REACT_APP_VERSION);
    //   }
    // } else {
    //   localStorage.clear();
    //   localStorage.setItem('version', process.env.REACT_APP_VERSION);
    // }
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
        count: counterSettings.count,
        hue: Math.floor(Math.random() * 360)
       }]) );
    setCounterSettings({name: '', count: 0})
  }

  const removeCounter = (id) => {
    setCounters((counters) => (counters.filter(counter => counter.id !== id)));
  }

  /**
   * 
   * @param {counter id} id the counter's id
   * @param {counter info} values an object containing the counter's updated info
   */
  const updateCounter = (id, values) => {
    const counterObj = counters.find(counter => counter.id === id);
    if (counterObj) {
      
    }
  }

  const changeCounter = (id, value) => {
    let newList = [...counters];
    newList.forEach(counter => {
      if (counter.id === id) {
        counter.count = value > MAX_COUNT ? MAX_COUNT : (value < MIN_COUNT ? MIN_COUNT : value);
      }
    });
    setCounters(newList);
  };

  const changeSettingsName = (e) => {
    setCounterSettings(counterSettings => ({...counterSettings, name: e.target.value}));
  }

  const changeSettingsCount = (e) => {
    let c = parseInt(e.target.value);
    console.log(process.env.MAX_COUNT);
    setCounterSettings(counterSettings => ({...counterSettings, count: c > MAX_COUNT ? MAX_COUNT : c}));
  }

  const onDragEnd = (result) => {
    const {source, destination} = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
    
    const movedCounter = counters[source.index];
    let newList = [...counters];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, movedCounter);

    setCounters(newList);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header className="App-header">
          <h2>Counter App</h2>
        </header>

        <div id="counters-section">
          <div id="create-counter">
            <h3 id="create-counter-title" >Create a counter to get started</h3>
            <form onSubmit={createCounter}>
              <input id="counter-name-setter" type="text" value={counterSettings.name} placeholder="Name..." onChange={changeSettingsName}></input>
              <input id="counter-count-setter" type="number" value={counterSettings.count} placeholder="Count..." onChange={changeSettingsCount}></input>
              <button id="create-counter-btn">
                <FontAwesomeIcon icon={faGreaterThan}  size="lg"/>
              </button>
            </form>
          </div>

          <Droppable droppableId={"droppable-counters"}>
            {
              (provided, snapshot) => (
                <div id="counters-list" ref={provided.innerRef} {...provided.droppableProps}>
                  {counters.length ? 
                  counters.map((counter, index) => (
                    <Draggable key={counter.id} draggableId={"draggable-"+counter.id} index={index}>
                      {
                        (provided, snapshot) => (
                          <Counter ref={provided.innerRef} counter={counter} changeCount={changeCounter} remove={removeCounter} update={updateCounter} provided={provided}/>
                        )
                      }
                    </Draggable>
                  )) 
                  : 
                  <div id="counters-list-empty">
                    <span>No counters at the moment. Create one now!</span>
                  </div>
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </div>

        <footer className="App-footer">
          <span>{process.env.REACT_APP_NAME} v. {process.env.REACT_APP_VERSION} by Jacky Lo</span>
        </footer>
      </div>
    </DragDropContext>
  );
}

export default App;
