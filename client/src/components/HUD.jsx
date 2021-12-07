import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import sun from '../assets/sun.png';
import sword from '../assets/sword.png';
import thunder from '../assets/thunder.png';

const HUD = ({ setPortalPosition, tokens, weapons, spells }) => {
  console.log('TOKENS, WEAPONS, SPELLS', tokens, weapons, spells);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  const handleSave = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('User Info'));
    const userId = userInfo.uid;

    console.log(userId);
    // save user info and relevant game state to mongoDB
  };

  return (
    <div id="hud-wrapper">
      <button onClick={handleLogout} className="hud-btn">Log out</button>
      <button onClick={setPortalPosition} className="hud-btn">Regenerate</button>
      <button onClick={handleSave} className="hud-btn">Save</button>
      <div id="inventory">
        <div id="tokens">
          {tokens} <img className="token" src={sun} height="50px" width="50px"/>
        </div>
        <div id="weapons">
          weapons
          {weapons.map((weapon, i) => {
            return(
              <img key={i} className={weapon} src={sword} height="50px" width="50px"/>
            );
          })}
        </div>
        <div id="spells">
          spells
          {spells.map((spell, i) => {
            return(
              <img key={i} className={spell} src={thunder} height="50px" width="50px"/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HUD