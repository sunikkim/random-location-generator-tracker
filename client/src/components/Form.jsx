import React from 'react';

const Form = () => {
  return (
    <div>
      <div className="heading-container">
        <h3>
          Please Log In
        </h3>
      </div>
      <form>
        <div>
          <label>Email: </label>
          <input name="email"></input>
        </div>
        <div>
          <label>Password: </label>
          <input name="password"></input>
        </div>
      </form>
    </div>
  );
};

export default Form;