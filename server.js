const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./db/models/users');
const Listing = require('./db/models/listing');
const jwt = require('jsonwebtoken');
const seedListingDB = require('./seed');
const cloudinary = require('cloudinary');
const cloudConfig = require('./cloudinary/config.js');
const multer = require('multer');

const upload = multer({dest: './uploads/'});


cloudinary.config(cloudConfig);

const app = express();

app.use(express.static((__dirname + '/src/public')));
app.use(bodyParser.json());
seedListingDB();



//post for login information
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
          email: email,
          name: '',
          phone: '',
          address: ''
        })
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
  console.log(req.body);
  var updateProfile = {
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address
  };

  User.findOneAndUpdate({email: email}, updateProfile, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Profile update success!');
    }
  })
});

// Check post listing for uploaded files and stores in req.files
let listingsUpload = upload.fields([{
  name: 'hostPictures',
  maxCount: 1
}, {
  name: 'homePictures',
  maxCount: 1
}]);

//post for listings
app.post('/listings', listingsUpload, (req, res, next) => {
  console.log('FILES', req.files);
  console.log('Text: ', req.body);

  if (req.files.hostPictures) {
    console.log('Send to cloudinary!', req.files.hostPictures[0].path);

    cloudinary.v2.uploader.upload(req.files.hostPictures[0].path, (err, result) => {
      if(err) {
        console.log('Cloudinary error: ', err);
      }
      req.body.hostPictures = result.url;
      console.log('Host Picture url: ', result.url)
      next();
    });
  } else next()

}, (req, res, next) => {
  if (req.files.homePictures) {
    console.log('Send to cloudinary!', req.files.homePictures[0].path);
    cloudinary.v2.uploader.upload(req.files.homePictures[0].path, (err, result) => {
      if (err) {
        console.log('Cloudinary error: ', err);
      }
      req.body.homePictures = result.url;
      console.log('Home Picture url: ', result.url);
      next();
    });
  } else next()
}, (req, res) => {
  console.log("After cloud: ", req.body.hostPictures, req.body.homePictures);


  Listing.findOne({name: req.body.name})
  .then((found) => {


    if (found) {
      // update Listing
      console.log('Found');
      Listing.update(req.body);
      console.log('Updated!', found);
      res.json({success: true, message: 'Thank you, your listing has been successfully updated!', listing: found});

    } else {
      // Create new Listing and save in database
      var newListing = new Listing({
        name: req.body.name,
        zipcode: req.body.zipcode,
        dogSizePreference: req.body.dogSizePreference,
        dogBreedPreference: req.body.dogBreedPreference,
        dogTemperamentPreference: req.body.dogTemperamentPreference,
        dogActivityPreference: req.body.dogActivityPreference,
        homeAttributes: req.body.homeAttributes,
        hostPictures: req.body.hostPictures,
        homePictures: req.body.homePictures,
        cost: req.body.cost
      });


      newListing.save((err, host) => {
        if (err) {
          res.json({success: false, message: err});
        } else {
          console.log("Saved ", host);
          res.json({success: true, message: 'Thank you, your listing has been successfully saved!', listing: host});
        }
      });
    }
  }).catch((err) => {
    res.json({success: false, message: err});
  })

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
app.get('/listings/:zipcode', (req, res) => {
  var zipcode = req.params.zipcode;
  Listing.find({ zipcode: req.params.zipcode })
    .exec((err, listings) => {
      //console.log(listings);
      if (err) {
        console.log('error');
      } else {
        res.send(listings);
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
