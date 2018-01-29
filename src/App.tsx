import * as React from 'react';
import './App.css';
import { Footer } from './presenters/Footer';
import { ToDoList } from './containers/ToDoList';
import { AddTodo } from './containers/AddTodo';

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
