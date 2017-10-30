import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, credentials, error }) => {
  return (
    <div className="formWrap">
      <div className="formGroupWrap">
        <h1 className="formTitle">Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="formGroup">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={credentials.email}
              className="formItem"
            />
            {error.email && <small>{error.email}</small>}
          </div>

          <div className="formGroup">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={credentials.password}
              className="formItem"
            />
            {error.password && <small>{error.password}</small>}
          </div>

          <button className="formBtn">Submit</button>

        </form>

      </div>
    </div>
  );
};

export default LoginForm;
