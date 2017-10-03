// import mongoose from 'mongoose';
var mongoose = require('mongoose');
var db = require('../config')

//last four = part of profile

usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
    email: { type: String, required: true },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
  }
);

var User = mongoose.model('User', usersSchema)

module.exports = User;
