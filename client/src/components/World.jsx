import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HUD from './HUD';

const World = () => {
  const [timer, setTimer] = useState('');
  const [style, setStyle] = useState({});
  const [inventory, setInventory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/world');
      setColor();
      setPortalPosition();
    }

    if (!authToken) {
      navigate('/login');
    }
  }, []);

  const setColor = (target) => {
    const generateRandomHexCode = () => {
      const n = (Math.random() * 0xfffff * 1000000).toString(16);
      return '#' + n.slice(0, 6);
    };

    if (target === 'world-wrapper') {
      let screen = document.getElementsByClassName('world-wrapper')[0];

      if (!screen) {
        return;
      }

      screen.style['background-color'] = generateRandomHexCode();
    } else if (target === 'portal') {
      let screen = document.getElementsByClassName('portal')[0];

      if (!screen) {
        return;
      }

      screen.style['background-color'] = generateRandomHexCode();
    }
    const probability = Math.floor(Math.random() * 100);

    if (probability % 3 === 0 || probability % 4 === 0) {
      screen = document.getElementsByClassName('portal')[0];
      screen.style['background-color'] = generateRandomHexCode();
    } else {
      screen = document.getElementsByClassName('world-wrapper')[0];
      screen.style['background-color'] = generateRandomHexCode();
    }
  };

  const handleClick = (e) => {
    const probability = Math.floor(Math.random() * 100);

    if (probability % 2 === 0) {
      for (let i = 0; i < probability / 10; i++) {
        setTimeout((e) => setColor(e), probability * Math.random() * 100 / i);
      }
    } else {
      e.persist();
      setColor(e.target.className);
    }
  };

  const setPortalPosition = () => {
    const rand1 = Math.floor(Math.random() * 100);
    const rand2 = Math.floor(Math.random() * 100);
    const rand3 = Math.floor(Math.random() * 20) + 5;
    const rand4 = Math.floor(Math.random() * 20) + 5;

    setStyle({
      ['position']: 'absolute',
      ['top']: `${rand1}vw`,
      ['left']: `${rand2}vw`,
      ['height']: `${rand3}vh`,
      ['width']: `${rand4}vw`,
    });
  };

  const handlePortalClick = (e) => {
    setInventory([...inventory, e.target.className]);
    console.log(inventory);
    setPortalPosition();
  };

  return (
    <div className="world-wrapper" onClick={handleClick}>
      <div className="portal" onClick={handlePortalClick} style={style}></div>
      <HUD setPortalPosition={setPortalPosition} inventory={inventory}/>
    </div>
  );
};

export default World;