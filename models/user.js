const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const placeSchema = mongoose.Schema({
  title: String,
  extract: String
});

placeSchema.virtual('shortExtract').get(function () {
  if(!this.extract) return false;
  const ellipsis = this.extract.length > 200 ? '...' : '';
  return this.extract.substring(0, 200) + ellipsis;
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required' },
  email: { type: String, required: 'Email is required', unique: 'That email has already been taken' },
  password: { type: String, required: 'Password is required' },
  places: [placeSchema]
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  // if(!this._passwordConfirmation) this.invalidate('passwordConfirmation', 'Password confirmation is required');
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
