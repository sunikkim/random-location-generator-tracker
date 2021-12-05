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
          <label for="email">Email: </label>
          <input name="email"></input>
        </div>
        <div>
          <label for="password">Password: </label>
          <input name="password"></input>
        </div>
      </form>
    </div>
  );
};

export default Form;