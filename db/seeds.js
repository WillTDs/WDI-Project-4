const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const Food      = require('../models/place');

const placeData = [{
  name: 'Wills House',
  summary: 'Where i live my life'
}];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Food.create(placeData))
  .then(places => console.log(`${places.length} places created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
