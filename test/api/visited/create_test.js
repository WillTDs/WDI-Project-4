/* global api, describe, it, expect, beforeEach, afterEach */

require('../helper');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const User = require('../../../models/user');

const visitedData = [{
  title: 'Wills house',
  extract: 'A wonderful place'
},{
  title: 'Wills other house',
  extract: 'Another wonderful place'
}];

describe('POST /api/visited/', () => {

  let token = null;

  beforeEach(done => {
    User.create({
      username: 'tester',
      email: 'test@test.com',
      password: 'test',
      passwordConfirmation: 'test',
      places: []
    }, (err, user) => {
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  it('should return a 401 response', done => {
    api
      .post('/api/visited/')
      .set('Accept', 'application/json')
      .send(visitedData[0])
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/visited/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(visitedData[0])
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/visited/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(visitedData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/Visited/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(visitedData[0])
      .end((err, res) => {
        expect(res.body.places[0].id).to.be.a('string');
        expect(res.body.places[0].title).to.equal(visitedData[0].title);
        expect(res.body.places[0].extract).to.equal(visitedData[0].extract);
        done();
      });
  });

});
