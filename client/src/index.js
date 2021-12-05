import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import Form from './components/Form.jsx';
import Button from './components/Button.jsx';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { app } from './firebase-config.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (id) => {
    const authentication = getAuth();

    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          console.log(response);
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    }
  };

  return (
    <div className="app">
      <>
        <h1>RPG</h1>
        <Routes>
          <Route
            path="/login"
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={() => handleSubmit(1)}
              />}
          />
          <Route
            path="/register"
            element={
              <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleSubmit={() => handleSubmit(2)}
              />}
          />
          <Route
            path="/home"
            element={
              <Home />
            }
          />
        </Routes>
      </>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
document.getElementById('app'));