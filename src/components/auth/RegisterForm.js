import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <div className="formWrap">
      <div className="formGroupWrap">
        <h1 className="formTitle">Register</h1>
        <form onSubmit={handleSubmit}>

          <div className='formGroup'>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={user.username}
              className="formItem"
            />
            {errors.username && <small>{errors.username}</small>}
          </div>

          <div className='formGroup'>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
              className="formItem"
            />
            {errors.email && <small>{errors.email}</small>}
          </div>

          <div className='formGroup'>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
              className="formItem"
            />
            {errors.password && <small>{errors.password}</small>}
          </div>

          <div className='formGroup'>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={user.passwordConfirmation}
              className="formItem"
            />
            {errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small>}
          </div>

          <button className="formBtn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
