import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button.jsx';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { app } from '../firebase-config.js';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Form = ({ title, setPassword, setEmail, handleSubmit }) => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(result, user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
      });
  };

  const GoogleLogin = () => {
    return(
      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
          <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
          <span> Continue with Google</span>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="heading-container">
        <h3>
          {title}
        </h3>
      </div>
      <form>
        <div>
          <label>Email: </label>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </form>
      <Button title={title} handleSubmit={handleSubmit} />
      {title === 'Login' && <button onClick={() => navigate('/register')}>New User?</button>}
      {title === 'Login' && <GoogleLogin />}
      {title === 'Register' && <button onClick={() => navigate('/login')}>Already have an account?</button>}
    </div>
  );
};

export default Form;