import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import Login from './components/Login.jsx';

const App = () => {
  return(
    <div>
      <h1>RPG</h1>
      <Login />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));