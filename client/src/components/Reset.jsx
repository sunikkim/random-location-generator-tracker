import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const Reset = () => {
  const [email, setEmail] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handlePasswordReset = (auth, email) => {
    sendPasswordResetEmail(auth, email)
      .then(result => {
        setConfirmation(true);
      })
      .catch(err => {
        alert('An error occurred - please make sure your email address is correct and try again!');
      });
  };

  return (
    <div className="reset">
      <div className="reset-container">
        <input
          type="text"
          className="reset-text-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button
          className="reset-btn"
          onClick={() => handlePasswordReset(auth, email)}
        >
          Send password reset email
        </button>
        {confirmation && <b>Sent password reset email to {email}!</b>}
        <div>
          Don't have an account? <Link to="/register">Register</Link>
       </div>
       <div className="text-below-form">
            Remembered your password? <Link to="/login">Login</Link>
          </div>
      </div>
    </div>
  );
}

export default Reset;