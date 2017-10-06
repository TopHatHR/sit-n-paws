const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const server = require('../server.js');
const mongoose = require('mongoose');

const db = require('../db/config');
const Listing = require('../db/models/listing');
const User = require('../db/models/users');

chai.use(require('chai-things'));

// ##################################
// TEST DATA FOR USERS AND LISTINGS
// ##################################

// user test for required schema fields only
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

// user test for completed schema fields
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

  beforeEach(function(done) {
    User.remove({ username: 'brianG123' }).exec();
    User.remove({ username: 'Lois456' }).exec();

    var newUser = new User(basicTestUsers[1])

    newUser.save();
    done();
  })

  // a new user added to database will return a response with success, username, and token
  it('Adds new user to database', function(done) {

    request(server)
      .post('/signup')
      .send(basicTestUsers[0])
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
      .send(basicTestUsers[1])
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
      .send(basicTestUsers[1])
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

  // NEED TO UPDATE THIS TEST POST SEED
  // NEED TO UPDATE THIS TEST POST SEED
  // NEED TO UPDATE THIS TEST POST SEED

  // returns 10 listings from seed data
  it('Returns all current listings in database', function(done) {

    request(server)
      .get('/listings')
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.be.an('array').to.have.lengthOf(10);
      })
      .end(done);
  })

});