const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const models = require('./db/models/users');
var User = models.User;
var Listing = models.Listing;

const app = express();

app.use(express.static((__dirname + '/src/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
})

//post for login information
app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  User.findOne({ username: username, password: password, email: email })
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

//post for signup information
app.post('/signup', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  User.findOne({ email: email })
    .exec((err, found) => {
      if (err) {
        throw err;
        console.log('error');
      }
      if (found) {
        res.redirect('/login');
      } else {
        User.Create({
          username: username,
          password: password,
          email: email
        }).save();
      }
    })
})

//post for profile
app.post('/profile', (req, res) => {
  var email = req.body.email;
  User.findOne({ email: email })
    .exec((err, user) => {
      if (err) {
        console.log('error');
      } else {
        user.set({
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address
        }).save();
      }
    })
})

//post for listings
app.post('/listings', (req, res) => {
  var newListing = new Listing ({
    name: req.body.name,
    zipcode: req.body.zipcode,
    dogPreferences: req.body.dogPreferences,
    homeAttributes: req.body.homeAttributes,
    hostPictures: req.body.hostPictures,
    homePictures: req.body.homePictures,
    cost: req.body.cost
  });
  newListing.save(function(err, host) {
    if (err) {
      throw err;
    }
  })
})

//get for listings (all)
app.get('/listings', (req, res) => {
  Listing.find({})
    .exec((err, listings) => {
      if (err) {
        console.log('error');
      } else {
        res.send(listings);
      }
    })
})

//get for listings by zipcode
app.get('/listings', (req, res) => {
  var zipcode = Number(req.params.id.slice(1));
  Listing.find({})
    .exec((err, listings) => {
      if (err) {
        console.log('error');
      } else {
        res.send('/listings/:zipcode', {
          listing: listings
        })
      }
    })
})

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});

module.exports = app;
