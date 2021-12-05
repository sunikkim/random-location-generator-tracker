import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sun from '../assets/sun.png';

const HUD = ({ setPortalPosition, inventory }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  return (
    <div id="hud-wrapper">
      <button onClick={handleLogout}>Log out</button>
      <button onClick={setPortalPosition}>Regenerate</button>
      <div id="inventory">
        {inventory.map((item, i) => {
          return(
            <img key={i} className="inventory-item" src={sun} height="50px" width="50px"/>
          );
        })}
      </div>
    </div>
  );
};

export default HUD