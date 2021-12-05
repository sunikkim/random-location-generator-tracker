import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HUD = ({ setPortalPosition }) => {
  const [inventory, setInventory] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  return (
    <div id="hud-wrapper">
      <button onClick={handleLogout}>Log out</button>
      <button onClick={setPortalPosition}>Regenerate</button>
    </div>
  );
};

export default HUD