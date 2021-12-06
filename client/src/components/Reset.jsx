import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const Reset = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {

  });

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
          onClick={() => sendPasswordResetEmail(auth, email)}
        >
          Send password reset email
        </button>
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