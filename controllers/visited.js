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
    .then((user) => res.status(201).json(user)) // TODO: this should be the place
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
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: visitedCreate,
  delete: visitedDelete
};
