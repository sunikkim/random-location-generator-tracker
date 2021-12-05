import React from 'react';

const Button = ({ title, handleSubmit }) => {
  return (
    <button onClick={handleSubmit} className="form-btn">{title}</button>
  );
};

export default Button;