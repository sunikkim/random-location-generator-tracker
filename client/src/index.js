import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.scss';

import Form from './components/Form';
import Button from './components/Button';
import Home from './components/Home';
import World from './components/World';
import Reset from './components/Reset';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { app } from './firebase-config.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');
    const startedGame = sessionStorage.getItem('Started Game');

    if (authToken && !startedGame) {
      navigate('/home');
    } else if (authToken && startedGame) {
      navigate('/world');
      // navigate('/home');
    } else if (!authToken) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (id) => {
    const auth = getAuth();

    if (id === 1) {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          navigate('/home');

          const user = response.user;

          sessionStorage.setItem('User Info', JSON.stringify(user));
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((err) => {
          if (err.code === 'auth/wrong-password' || 'auth/invalid-email'){
            toast.error('Invalid login info');
          }
        });
    }

    if (id === 2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const user = response.user;

          sessionStorage.setItem('User Info', JSON.stringify(user));
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="app">
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
        <Route
          path="/world"
          element={
            <World />
          }
        />
        <Route
          path="/reset"
          element={
            <Reset />
          }
        />
      </Routes>
      <ToastContainer />
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