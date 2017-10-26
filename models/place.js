const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  summary: String
});

module.exports = mongoose.model('place', placeSchema);
