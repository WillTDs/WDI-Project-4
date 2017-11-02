/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RegisterForm from '../../../src/components/auth/RegisterForm';

describe('RegisterForm tests', () => {

  it('should render four input fields', done => {
    const props = {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {}
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('input').length).to.equal(4);
    done();
  });

  it('should populate the form', done => {
    const props = {
      user: {
        username: 'test',
        email: 'test@test.com',
        password: 'test',
        passwordConfirmation: 'test'
      },
      errors: {}
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find({ value: 'test@test.com' }).length).to.equal(1);
    expect(wrapper.find({ value: 'test' }).length).to.equal(3);
    done();
  });

  it('should correctly display errors', done => {
    const props = {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {
        username: 'Username is required',
        email: 'Email is required',
        password: 'Password is required',
        passwordConfirmation: 'Password Confirmation is required'
      }
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('small.formError').length).to.equal(4);
    done();
  });

});
