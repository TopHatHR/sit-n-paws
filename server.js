const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./db/models/users');
const Listing = require('./db/models/listing');
const jwt = require('jsonwebtoken');
const seedListingDB = require('./seed');

const app = express();

app.use(express.static((__dirname + '/src/public')));
app.use(bodyParser.json());
seedListingDB();



// post for login information
// app.post('/login', (req, res) => {
//   var username = req.body.username;
//   var password = req.body.password;
//
//   User.findOne({ username: username})
//     .exec((err, found) => {
//       if (err) {
//         throw err;
//         console.log('error');
//       }
//       if (found) {
//         res.send(JSON.stringify({
//           success: true,
//           username: found.username,
//         }));
//       } else {
//         res.send(JSON.stringify({
//           success: false,
//           error: 'Invalid Username/Password'
//         }));
//       }
//     })
// });

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username})
     .exec((err, found) => {
      if (err) {
        throw err;
        console.log('error');
      } else {
        if (found) {
          found.comparePassword(password).then(match => {
            if (match) {

              let payload = {
                username: found.username
              };

              let token = jwt.sign(payload, 'Shaken, not stirred', {
                expiresIn: '1h'
              });

              res.json({
                success: true,
                username: found.username,
                token: token
              });
            }
          })
        } else {
          res.send(JSON.stringify({
            success: false,
            error: 'Invalid Username/Password'
          }));
        }
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
        res.send(JSON.stringify({
          success: false,
          error: 'User already exists!',
        }));
      } else {
        User.create({
          username: username,
          password: password,
          email: email
        })
        // var newUser = new User ({
        //   username: username,
        //   password: password,
        //   email: email
        // })
        .then((newUser) => {

          let payload = {
            username: newUser.username
          };

          let token = jwt.sign(payload, 'Shaken, not stirred', {
            expiresIn: '1h'
          });

          res.json({
            success: true,
            username: newUser.username,
            token: token
          });

        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
    console.log(password);
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
  var newListing = new Listing({
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
  });
});

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

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
})

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});

module.exports = app;
