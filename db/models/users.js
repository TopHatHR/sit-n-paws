// import mongoose from 'mongoose';
var mongoose = require('mongoose');
var sitnpaws = require('../config');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Promise = require('bluebird');

//last four = part of profile

usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
  }
);

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
  // var user = this;
  // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  //   if (err) {
  //     return err;
  //   }
  //   bcrypt.hash(user.password, salt, function(err, hash) {
  //     if (err) {
  //       return err;
  //     }
  //     user.password = hash;
  //     next();
  //   })
  // })
});

usersSchema.methods.comparePassword = function(enteredpwd, cb) {
  var comp = Promise.promisify(bcrypt.compare);
  return comp(pwd, this.password).bind(this)
  .then((match) => match);
  // bcrypt.compare(enteredpwd, this.password, function(err, isMatch) {
  //   if (err) {
  //     return cb(err);
  //   }
  //   cb(null, isMatch);
  // })
};

var User = mongoose.model('User', usersSchema);
module.exports = User;
