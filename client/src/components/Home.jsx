import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  const handleNewGame = () => {
    sessionStorage.setItem('Started Game', true);
    navigate('/world');
  };

  const handleContinue = () => {
    navigate('/continue');
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/home');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h2>Welcome Back!</h2>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleContinue}>Continue</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;