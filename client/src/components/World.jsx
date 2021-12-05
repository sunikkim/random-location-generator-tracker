import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const World = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/world');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="world-wrapper"></div>
  );
};

export default World;