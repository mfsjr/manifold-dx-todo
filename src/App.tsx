import * as React from 'react';
import './App.css';
import { Footer } from './presenters/Footer';
import { ToDoList } from './containers/ToDoList';
import { AddTodo } from './containers/AddTodo';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AddTodo/>
        <ToDoList />
        <Footer/>
      </div>
    );
  }
}

export default App;
