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
              className={'formItem ' + (errors.username ? 'error' : '')}
            />
            {errors.username && <small className="formError">{errors.username}</small>}
          </div>

          <div className='formGroup'>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
              className={'formItem ' + (errors.email ? 'error' : '')}
            />
            {errors.email && <small className="formError">{errors.email}</small>}
          </div>

          <div className='formGroup'>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
              className={'formItem ' + (errors.password ? 'error' : '')}
            />
            {errors.password && <small className="formError">{errors.password}</small>}
          </div>

          <div className='formGroup'>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={user.passwordConfirmation}
              className={'formItem ' + (errors.passwordConfirmation ? 'error' : '')}
            />
            {errors.passwordConfirmation && <small className="formError">{errors.passwordConfirmation}</small>}
          </div>

          <button className="formBtn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
