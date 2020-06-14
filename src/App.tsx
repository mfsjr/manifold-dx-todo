import * as React from 'react';
import './App.css';
import {AddTodo} from "./components/AddToDo";
import {ToDoList} from "./components/ToDoList";
import {Footer} from "./components/Footer";

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AddTodo/>
        <ToDoList />
        <Footer/>
      </div>
    );
  }
}

export default App;
