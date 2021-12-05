import React from 'react';

const Button = ({ title, handleSubmit }) => {
  return (
    <button onClick={handleSubmit}>{title}</button>
  );
};

export default Button;