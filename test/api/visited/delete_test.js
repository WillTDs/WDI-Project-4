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

describe('DELETE /api/visited/:id', () => {

  let token = null;
  let place = null;

  beforeEach(done => {

    User.create({
      username: 'test',
      email: 'test@test.com',
      password: 'test',
      passwordConfirmation: 'test',
      places: [visitedData]
    })
      .then(user => {
        place = user.places[0];
        token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
        done();
      })
      .catch(done);
  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

  it('should return a 401 response', done => {
    api
      .delete('/api/visited/' + place.id)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 204 response with a token', done => {
    api
      .delete('/api/visited/' + place.id)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should return nada', done => {
    api
      .delete('/api/visited/' + place.id)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err) => {
        User
          .findById(place.id)
          .exec()
          .then(res => expect(res).to.be.null);
        done(err);
      });
  });

});
