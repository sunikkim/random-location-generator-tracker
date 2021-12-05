import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HUD from './HUD';

const World = () => {
  const [timer, setTimer] = useState('');
  const [style, setStyle] = useState({});
  const [inventory, setInventory] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [level, setLevel] = useState(1);

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

  const generateRandomHexCode = () => {
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

  const setColor = (target) => {

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
    } else {
      screen = document.getElementsByClassName('world-wrapper')[0];
    }

    screen.style['background-color'] = generateRandomHexCode();
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
    const rand1 = Math.floor(Math.random() * 80);
    const rand2 = Math.floor(Math.random() * 80);
    const rand3 = Math.floor(Math.random() * 20) + 5;
    const rand4 = Math.floor(Math.random() * 20) + 5;

    setStyle({
      position: 'absolute',
      top: `${rand1}vw`,
      left: `${rand2}vw`,
      height: `${rand3}vh`,
      width: `${rand4}vw`,
    });
  };

  const handlePortalClick = (e) => {
    setInventory([...inventory, e.target.className]);
    setPortalPosition();
  };

  const handleMouseOver = () => {
    setIsHovering(true);

    let screen = document.getElementsByClassName('portal')[0];
    screen.style['background-color'] = 'white';
  };

  const handleMouseOut = () => {
    setIsHovering(false);

    let screen = document.getElementsByClassName('portal')[0];
    screen.style['background-color'] = generateRandomHexCode();
  };

  const HoverPortal = () => {
    const rand1 = Math.floor(Math.random() * 100);
    const rand2 = Math.floor(Math.random() * 100);
    const rand3 = Math.floor(Math.random() * 5) + 5;
    const rand4 = Math.floor(Math.random() * 5) + 5;

    const style = {
      position: 'absolute',
      top: `${rand1}vw`,
      left: `${rand2}vw`,
      height: `${rand3}vh`,
      width: `${rand4}vw`,
    };

    return(
      <div className="hover-portal" style={style}></div>
    );
  };

  return (
    <div id="main-wrapper">
      <div className="world-wrapper" onClick={handleClick}>
        <div className="portal" onClick={handlePortalClick} style={style}onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}></div>
      </div>
      <HUD setPortalPosition={setPortalPosition} inventory={inventory}/>
      {isHovering && <HoverPortal />}
      {isHovering && <HoverPortal />}
      {isHovering && <HoverPortal />}
    </div>
  );
};

export default World;