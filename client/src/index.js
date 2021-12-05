import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import Form from './components/Form.jsx';
import Button from './components/Button.jsx';

const App = () => {
  return(
    <div>
      <h1>RPG</h1>
      <Form />
      <Button />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));