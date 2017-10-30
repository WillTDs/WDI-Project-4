const Place = require('../models/place');

function visitedIndex(req, res, next) {
  Place
    .find()
    .exec()
    .then(visited => res.json(visited))
    .catch(next);
}

function visitedCreate(req, res, next) {

  Place
    .create(req.body)
    .then(place => res.status(201).json(place))
    .catch(next);
}

function visitedShow(req, res, next) {
  Place
    .findById(req.params.id)
    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      res.json(place);
    })
    .catch((err) => {
      console.log('ERROR IN CATCH ===========>', err);
      next(err);
    });
}

function visitedUpdate(req, res, next) {
  Place
    .findById(req.params.id)
    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      place = Object.assign(place, req.body);
      return place.save();
    })
    .then(place => res.json(place))
    .catch(next);
}

function visitedDelete(req, res, next) {
  Place
    .findById(req.params.id)
    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      return place.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: visitedIndex,
  create: visitedCreate,
  show: visitedShow,
  update: visitedUpdate,
  delete: visitedDelete
};
