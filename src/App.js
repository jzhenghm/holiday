import React, { Component } from 'react';
import Calendar from 'rc-calendar';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Holiday Editor</h2>
        </div>
	<Calendar />
      </div>
    );
  }
}

export default App;
