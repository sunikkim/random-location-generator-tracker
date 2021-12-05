import React from 'react';

import Button from './Button.jsx';

const Form = ({ title, setPassword, setEmail, handleSubmit }) => {
  return (
    <div>
      <div className="heading-container">
        <h3>
          {title}
        </h3>
      </div>
      <form>
        <div>
          <label>Email: </label>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </form>
      <Button title={title} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Form;