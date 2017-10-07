const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const path = require('path');
const server = require('../server.js');
const mongoose = require('mongoose');

const db = require('../db/config');
const Listing = require('../db/models/listing');
const User = require('../db/models/users');

chai.use(require('chai-things'));

// ##################################
// TEST DATA FOR USERS AND LISTINGS
// ##################################

// user test data for required schema fields only
const basicTestUsers = [
  {
    username: 'brianG123',
    password: 'writer123',
    email: 'brianG@random.edu'
  },
  {
    username: 'Lois456',
    password: 'Pewterschmidt',
    email: 'Lois456@yahoo.com'
  },
  {
    username: 'flyguy123',
    password: 'giggity',
    email: 'flyguy@flight.com'
  }
];

// user test data for completed schema fields
const completeTestUsers = [
  {
    username: 'brianG123',
    password: 'writer123',
    email: 'brianG@random.edu',
    name: 'Brian Griffin',
    phone: '555-235-1234',
    address: '31 Spooner Street'
  },
  {
    username: 'Lois456',
    password: 'Pewterschmidt',
    email: 'Lois456@yahoo.com',
    name: 'Lois Griffin',
    phone: '555-235-1234',
    address: '31 Spooner Street'
  },
  {
    username: 'flyguy123',
    password: 'giggity',
    email: 'flyguy@flight.com',
    name: 'Glenn Quagmire',
    phone: '855-235-9876',
    address: '33 Spooner Street'
  }
];

// listings test data for completed listing schema fields - NOTE ALL FIELDS REQUIRED IN SCHEMA
const listingsData = [
  {"name":"Jo ann Greatham","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"Corgi","dogTemperamentPreference":"Synergized","dogActivityPreference":"rutrum","homeAttributes":"Engineering","hostPictures":"https://randomuser.me/api/portraits/women/44.jpg","homePictures":"https://farm7.staticflickr.com/6076/6080657644_19cfe82456.jpg","cost":35},
  {"name":"Madella Feathersby","zipcode":94110,"dogSizePreference":"super extra large","dogBreedPreference":"Chihuahua","dogTemperamentPreference":"Proactive","dogActivityPreference":"dapibus","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/women/45.jpg","homePictures":"https://farm1.staticflickr.com/68/187943195_05de9fe99b.jpg","cost":55},
  {"name":"Thomasina Luscombe","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"Dachshund","dogTemperamentPreference":"Cloned","dogActivityPreference":"lacus","homeAttributes":"Sales","hostPictures":"https://randomuser.me/api/portraits/women/46.jpg","homePictures":"https://farm6.staticflickr.com/5510/14490433662_2745930345.jpg","cost":30},
  {"name":"Shelley Philpot","zipcode":94106,"dogSizePreference":"teeny weeny","dogBreedPreference":"German Shepherd","dogTemperamentPreference":"task-force","dogActivityPreference":"amet","homeAttributes":"Human Resources","hostPictures":"https://randomuser.me/api/portraits/women/47.jpg","homePictures":"https://farm4.staticflickr.com/3062/3046570389_f960000e36.jpg","cost":65},
  {"name":"Isidora Hemms","zipcode":94110,"dogSizePreference":"large","dogBreedPreference":"Pitbull","dogTemperamentPreference":"Seamless","dogActivityPreference":"ipsum","homeAttributes":"Engineering","hostPictures":"https://randomuser.me/api/portraits/women/48.jpg","homePictures":"https://farm1.staticflickr.com/229/516113751_e2222a5a64.jpg","cost":30},
  {"name":"Say Swinglehurst","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"ROSIE","dogTemperamentPreference":"Expanded","dogActivityPreference":"fusce","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/men/55.jpg","homePictures":"https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg","cost":57},
  {"name":"Angus Bafford","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"CHUNKY","dogTemperamentPreference":"Progressive","dogActivityPreference":"lorem","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/men/56.jpg","homePictures":"https://scontent.fsjc1-3.fna.fbcdn.net/v/t31.0-8/14500780_151623151960598_8947738040944491792_o.jpg?oh=c2362b13fe7e7e25c1b1c0cfc5319147&oe=5A7FDE71","cost":60},
  {"name":"Breanne Carnoghan","zipcode":94110,"dogSizePreference":"medium","dogBreedPreference":"Bloodhound","dogTemperamentPreference":"interface","dogActivityPreference":"erat","homeAttributes":"Legal","hostPictures":"https://randomuser.me/api/portraits/men/57.jpg","homePictures":"https://farm4.staticflickr.com/3586/3468872496_d62d4580b9.jpg","cost":32},
  {"name":"Fabio Handaside","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"Mix","dogTemperamentPreference":"Polarised","dogActivityPreference":"proin","homeAttributes":"Product Management","hostPictures":"https://randomuser.me/api/portraits/men/58.jpg","homePictures":"https://farm4.staticflickr.com/3193/2683030380_8ac4712010.jpg","cost":25},
  {"name":"Lily Feake","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"All","dogTemperamentPreference":"time-frame","dogActivityPreference":"vel","homeAttributes":"Training","hostPictures":"https://randomuser.me/api/portraits/men/59.jpg","homePictures":"https://farm4.staticflickr.com/3163/2780745441_a39b974e55.jpg","cost":55}
];

// test listing formatted for FormData
const testFormListing = [
  {
  "name":"Lily Feake","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"All","dogTemperamentPreference":"time-frame","dogActivityPreference":"vel","homeAttributes":"Training","cost":55
  }
]

// test images for uploading to cloudinary service
const testImage1 = path.join(__dirname, '..\\test\\TESTimage1.png');
const testImage2 = path.join(__dirname, '..\\test\\TESTimage2.png');

// ##################################
// Test Server and Client Are Active
// ##################################

describe('Server and Client Are Active', function() {

  it('Respond with 200 at localhost port 3000', function(done) {
  request(server)
    .get('/')
    .expect(200, done)
  })

  it('Responds with index.html at root path', function(done) {
  request(server)
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .then(res => expect(res.text).to.contain('<div id="app"></div>'));
    done();
  })

});

// ##################################
// Test User APIs and Database
// ##################################

describe('User APIs and Database', function() {

  // create array of usernames from mock user data for testing
  var userNames = [];
    for(var i = 0; i < basicTestUsers.length; i++) {
      userNames.push(basicTestUsers[i].username);
    }

  beforeEach(function(done) {
    // assure mock users are removed from database
    User.remove({ username: { "$in": userNames } }).exec();

    // add one user for tests
    var newUser = new User(basicTestUsers[0])
    newUser.save();
    done();
  })

  after(function() {
    // remove mock users from database after test completion
    User.remove({ username: { "$in": userNames } }).exec();
  })

  // a new user added to database will return a response with success, username, and token
  it('Adds new user to database', function(done) {
    request(server)
      .post('/signup')
      .send(basicTestUsers[1])
      .expect(200)
      .expect(function(res) {
        expect(res.body.success).to.equal(true);
      })
      .end(done);
  })

  // a user already in the database will return an empty object
  it('Prevents same username being added to database', function(done) {
    request(server)
      .post('/signup')
      .send(basicTestUsers[0])
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.be.empty;
      })
      .end(done);
  })

  // a user can login and receive a success response
  it('Allows valid user to be logged in', function(done) {

    request(server)
      .post('/login')
      .send(basicTestUsers[0])
      .expect(200)
      .expect(function(res) {
        expect(res.body.success).to.equal(true);
      })
      .end(done);
  })

});

// ##################################
// Test Listings APIs and database
// ##################################

describe('Listings APIs and database', function() {

  before(function(done) {

    var listingsNamesData = [];

    for(var i = 0; i < listingsData.length; i++) {
      listingsNamesData.push(listingsData[i].name);
    }

    // assure mock listings are removed from database
    Listing.remove({ name: { "$in": listingsNamesData } }).exec();
    done();
  })

  // add one listing to database using formData supertest field and attach
  it('Add one listing to the database', function(done) {
    request(server)
      .post('/listings')
      .field('name', 'Lily Feake')
      .field('zipcode', 94106)
      .field('dogSizePreference', 'medium')
      .field('dogBreedPreference', 'All')
      .field('dogTemperamentPreference', 'hangry')
      .field('dogActivityPreference', 'relaxed')
      .field('homeAttributes', 'big yard')
      .field('cost', 55)
      .attach('hostPictures', testImage1)
      .attach('homePictures', testImage2)
      .expect(200)
      .expect(function(res) {
        expect(res.body.success).to.equal(true);
      })
      .end(done);
  })

  // returns one total listing from database
  it('Returns all(i.e. one seeded) listing in database', function(done) {
    request(server)
      .get('/listings')
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.be.an('array').to.have.lengthOf(1);
      })
      .end(done);
  })

  // returns search query for zipcode
  it('Returns search query for zipcode', function(done) {
    request(server)
      .get('/listings/94106')
      .expect(200)
      .expect(function(res) {
        expect(res.body[0].zipcode).to.be.equal(94106);
      })
      .end(done);
  })

  // returns multiple listings from search query for zipcode with more than one database entry
  it('Returns multiple listings from search query for zipcode', function(done) {
    request(server)
      .post('/listings')
      .field('name', 'Angus Bafford')
      .field('zipcode', 94106)
      .field('dogSizePreference', 'small')
      .field('dogBreedPreference', 'All')
      .field('dogTemperamentPreference', 'chill')
      .field('dogActivityPreference', 'fast')
      .field('homeAttributes', 'apartment')
      .field('cost', 45)
      .attach('hostPictures', testImage1)
      .attach('homePictures', testImage2)
      .expect(200)
      .expect(function(res) {
        expect(res.body.success).to.equal(true);
      })
      .end(function() {

        request(server)
          .get('/listings/94106')
          .expect(200)
          .expect(function(res) {
            expect(res.body).to.be.an('array').to.have.lengthOf(2);
          })
          .end(done);
      });
  })

});