// import mongoose from 'mongoose';
var mongoose = require('mongoose');
var db = require('../config')

usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
  }
);

var User = mongoose.model('User', usersSchema)

// export default User;
module.exports = User;
