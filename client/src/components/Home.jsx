import React, { useEffect, useContext } from 'react';
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
      <h2 className="welcome-header">{`Welcome Back, ${'[firstName]'}!`}</h2>
      <div className="home-container">
      <button onClick={handleNewGame} className="home-btn">New Game</button>
      <button onClick={handleContinue} className="home-btn">Continue</button>
      <button onClick={handleLogout} className="home-btn">Log out</button>
      </div>
    </div>
  );
};

export default Home;