var mongoose = require('mongoose');
var sitnpaws = require('../config');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Promise = require('bluebird');

//user schema
usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    dogs: [
      {
        name: {type: String, required: true},
        dogSize: {type: String, required: true},
        dogBreed: {type: String, required: true},
        dogActivityReq: {type: String, required: true},
        bio: {type: String, required: true},
        dogPictures: {type: String, required: true},
        age: {type: Number, required: true},
      }
    ]
  }
);

//password encryption
usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});

//compare passwords
usersSchema.methods.comparePassword = function(pwd) {
  var comp = Promise.promisify(bcrypt.compare);
  return comp(pwd, this.password).bind(this)
  .then((match) => match);
};

var User = mongoose.model('User', usersSchema);

module.exports = User;
