import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import sun from '../assets/sun.png';
import sword from '../assets/sword.png';
import thunder from '../assets/thunder.png';

const HUD = ({ setPortalPosition, tokens, weapons, spells }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  const handleSave = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('User Info'));
    const userId = userInfo.uid;

    console.log(userId);

    const data = {
      id: userId,
      name: userInfo.displayName,
      tokens,
      weapons,
      spells
    };

    // save user info and relevant game state to mongoDB
    axios.post('/data', data)
      .then((result) => {
        console.log('post data result', result)
      })
      .catch((err) => {
        console.log('post data err', err);
      });
  };

  return (
    <div id="hud-wrapper">
      <button onClick={handleLogout} className="hud-btn">Log out</button>
      <button onClick={setPortalPosition} className="hud-btn">Regenerate</button>
      <button onClick={handleSave} className="hud-btn">Save</button>
      <div id="tokens">
        <img className="inventory-item" src={sun}/><span id="token-text">x {tokens}</span>
      </div>
      <div id="weapons">
        {weapons.map((weapon, i) => {
          return(
            <img key={i} className="inventory-item" src={sword}/>
          );
        })}
      </div>
      <div id="spells">
        {spells.map((spell, i) => {
          return(
            <img key={i} className="inventory-item" src={thunder}/>
          );
        })}
      </div>
    </div>
  );
};

export default HUD;