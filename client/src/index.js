import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>RPG</h1>
        <div id="description">Description here</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));