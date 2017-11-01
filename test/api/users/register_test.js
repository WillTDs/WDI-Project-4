/* global api, describe, it, expect, afterEach */

require('../helper');
const User = require('../../../models/user');

const badUser = {
  username: 'testy',
  email: 't@t.com',
  password: 'testy',
  passwordConfirmation: 'hhhhh'
};

const goodUser = {
  username: 'test',
  email: 'test@testg.com',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /api/register', () => {

  afterEach(done => {
    User.collection.remove();
    done();
  });

  it('should return a 422 response', done => {
    api
      .post('/api/register/')
      .set('Accept', 'application/json')
      .send(badUser)
      .expect(422, done);
  });

  it('should return a 200 response when registering with good credentials', done => {
    api
      .post('/api/register/')
      .set('Accept', 'application/json')
      .send(goodUser)
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .put('/api/register/')
      .set('Accept', 'application/json')
      .send(goodUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/register/')
      .set('Accept', 'application/json')
      .send(goodUser)
      .end((err, res) => {
        const userItem = res.body;
        expect(userItem.message).to.equal('Registration successful');
        done();
      });
  });

});
