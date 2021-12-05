import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import Form from './components/Form.jsx';
import Button from './components/Button.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  return(
    <Router>
      <div className="app">
        <>
        <h1>RPG</h1>
        <Routes>
          <Route path="/login" element={<Form />}/>
          <Route path="/register" element={<Form />}/>
        </Routes>
        </>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));