const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const models = require('./db/models/users');
var User = models.User;
// import User from '.db/models/users';

const app = express();

app.use(express.static((__dirname + '/src/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
})

//post for login information
app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username: username, password: password})
    .exec((err, found) => {
      if (err) {
        throw err;
        console.log('error');
      }
      if (found) {
        res.redirect('/');
      } else {
        res.redirect('/signup');
      }
    })
});

//post for owner profile
app.post('/ownerprofile', (req, res) => {

})

//post for host profile
app.post('/hostprofile', (req, res) => {

})

//post for listings
app.post('/listings', (req, res) => {

})

//get for listings



app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});

module.exports = app;
