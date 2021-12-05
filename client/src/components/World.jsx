import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const World = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/world');
      setColor();
    }

    if (!authToken) {
      navigate('/login');
    }
  }, []);

  const setColor = () => {
    const generateRandomHexCode = () => {
      const n = (Math.random() * 0xfffff * 1000000).toString(16);
      return '#' + n.slice(0, 6);
    };

    let screen = document.getElementsByClassName('world-wrapper')[0];
    screen.style['background-color'] = generateRandomHexCode();
  };

  const handleClick = (e) => {
    setColor();
  };

  return (
    <div className="world-wrapper" onClick={handleClick}></div>
  );
};

export default World;