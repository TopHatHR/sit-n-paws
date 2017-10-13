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
const nodemailer = require('nodemailer');
const upload = multer({dest: './uploads/'});
let port = process.env.PORT || 3000

// This is the shape of the object from the config file which is gitignored
// const cloudConfig = {
//   cloud_name: 'top-hat',
//   api_key: 'API_KEY',
//   api_secret: 'API_SECRET'
// };

cloudinary.config(cloudConfig);
const app = express();
app.use(express.static((__dirname + '/src/public')));
app.use(bodyParser.json());
seedListingDB();

//handles log in information in the db, creates jwt
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
                username: found.username,
                name: found.name
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

//handles new user creations in db
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
            username: newUser.username,
            name: newUser.name,
            email: newUser.email
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

//handles updating profiles in db
app.post('/profile', (req, res) => {
  var email = req.body.email;

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

app.post('/dog', (req, res) => {
  var email = req.body.email;
  console.log('Request body', req.body)

  var dog = {
    name: req.body.name,
    dogSize: req.body.dogSize,
    dogBreed: req.body.dogBreed,
    dogActivityReq: req.body.dogActivityReq,
    bio: req.body.bio,
    dogPictures: req.body.dogPictures,
    age: req.body.age,
  }
  User.findOneAndUpdate(
    email,
    { $push: {
        dogs: dog
      }
    }
    , function(err, dogs) {
      console.log('response',dogs[0].dogs)
      if(err) {
        res.status(404).send(err);
      } else {
        res.status(200).send()
      }
  })
});

//returns User's dogs
app.get('/dog', (req, res) => {
  var email = req.query.email;
  if (!email) {
    res.status(404).send('No email provided');
  }
  User.find({email: email}).select('dogs')
  .exec((err, dogs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(dogs[0].dogs);
      }
  })
})


//Check post listing for uploaded files and stores in req.files
let listingsUpload = upload.fields([{
  name: 'hostPictures',
  maxCount: 1
}, {
  name: 'homePictures',
  maxCount: 1
}]);

//handles posts for listings in db
app.post('/listings', listingsUpload, (req, res, next) => {
  // The 'next()' is important as it ensures the images get sent
  // to the Cloudinary servers after the Listing and responses are
  // sent to the client, making the upload responsive
  Listing.findOne({name: req.body.name})
  .then((found) => {
    if (found) {
      // update Listing
      Listing.update(req.body);
      res.json({success: true, message: 'Thank you, your listing has been successfully updated!', listing: found});
      next();
    } else {
      // Create new Listing and save in database
      var newListing = new Listing({
        name: req.body.name,
        email: req.body.email,
        zipcode: req.body.zipcode,
        dogSizePreference: req.body.dogSizePreference,
        dogBreedPreference: req.body.dogBreedPreference,
        // dogTemperamentPreference: req.body.dogTemperamentPreference,
        dogActivityPreference: req.body.dogActivityPreference,
        homeAttributes: req.body.homeAttributes,
        hostPictures: 'Image is being uploaded...',
        homePictures: 'Image is being uploaded...',
        cost: req.body.cost
      });
      newListing.save((err, host) => {
        if (err) {
          res.json({success: false, message: err});
        } else {
          res.json({success: true, message: 'Thank you, your listing has been successfully saved!', listing: host});
        }
        next();
      });
    }
  }).catch((err) => {
    res.json({success: false, message: err});
    next();
  });
}, (req, res) => {
  // Sends files to the Cloudinary servers and updates entries in the database
  if (req.files.hostPictures) {
    console.log('Send to cloudinary!', req.files.hostPictures[0].path);
    cloudinary.v2.uploader.upload(req.files.hostPictures[0].path, (err, result) => {
      if(err) {
        console.log('Cloudinary error: ', err);
      }
      console.log('Host Picture url: ', result.url)
      Listing.findOneAndUpdate({name: req.body.name}, {hostPictures: result.url}, (err, found) => {
        if (err) {
          console.log(err);
        }
        console.log('Updated Host Pictures: ', found);
      });
    });
  }
  if (req.files.homePictures) {
    console.log('Send to cloudinary!', req.files.homePictures[0].path);
    cloudinary.v2.uploader.upload(req.files.homePictures[0].path, (err, result) => {
      if (err) {
        console.log('Cloudinary error: ', err);
      }
      console.log('Home Picture url: ', result.url);
      Listing.findOneAndUpdate({name: req.body.name}, {homePictures: result.url}, (err, found) => {
        if (err) {
          console.log(err);
        }
        console.log('Updated Home Pictures: ', found)
      });
    });
  }
});

//handles getting all listings that exist
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

//handles getting listings by zipcode from search
app.get('/listings/:zipcode', (req, res) => {
  var zipcode = req.params.zipcode;
  Listing.find({ "$where": `function() { return this.zipcode.toString().match(/${zipcode}/) !== null; }`})
    .exec((err, listings) => {
      if (err) {
        console.log(err);
      } else {
        res.send(listings);
        }
      })
})

//handles requests for contacting host, sends email to host
app.post('/contacthost', (req, res) => {
  var ownerEmail = req.body.ownerEmail;
  var hostEmail = req.body.hostEmail;
  var date = req.body.date;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sitnpawstophat@gmail.com', // Your email id
      pass: 'SitNPawsHR1' // Your password
    }
  });
  var mailOptions = {
    to: hostEmail,
    subject: 'Hi from Sit-n-Paws! A friend wants to stay at your house on ' + date,
    text: 'Email the pet owner @ ' + ownerEmail + ' Please respond within 24 hours!'
  };
  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.json({hi: 'error here'})
    } else {
      console.log('Email sent: ' + response.response);
      res.json({hi: response.response});
    }
  });
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
})

// app.set('port', (process.env.PORT || 3000));
// app.get('/', function() {
//   response.send('App is running');
// }).listen(app.get('port', function() {
//   console.log('App is running, server is listening on port', app.get('port'));
// })
// })
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on server:3000');
});

module.exports = app;
