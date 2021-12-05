import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(result, user);

        sessionStorage.setItem('Auth Token', token);
        navigate('/home');
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        const email = err.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  const GoogleLogin = () => {
    return(
      <button className="form-btn form-google">Continue with Google</button>
    );
  };

  return (
    <div className="form">
      <div className="form-container">
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-text-box"
          placeholder="Email"
        ></input>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-text-box"
          placeholder="Password"
        ></input>
        <Button title={title} handleSubmit={handleSubmit} />
        {title === 'Login' && <GoogleLogin />}
        {title === 'Login' &&
          <div>
            <div>Don't have an account? <Link to="/register">Register</Link></div>
            <div>
              <Link to="/reset">Forgot Password</Link>
            </div>
          </div>
        }
        {title === 'Register' &&
          <div>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Form;