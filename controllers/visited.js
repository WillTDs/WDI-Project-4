const User = require('../models/user');

function visitedCreate(req, res, next) {
  User
    .findById(req.currentUser.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      const place = user.places.create(req.body);
      user.places.push(place);

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function visitedDelete(req, res, next) {
  User
    .findById(req.currentUser.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      const place = user.places.id(req.params.id);
      place.remove();

      return user.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: visitedCreate,
  delete: visitedDelete
};
