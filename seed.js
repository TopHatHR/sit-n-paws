// import mongoose, config, and listing schema
const mongoose = require('mongoose');
const Listing = require('./db/models/listing');
const User = require('./db/models/users');
// seed data
const listingsData = [
{"name":"Chris Pfaff","zipcode":94106,"description":"great home with lots of space","dogSizePreference":"medium","dogBreedPreference":"Corgi","email":"chrispfaff10@gmail.com","dogActivityPreference":"rutrum","homeAttributes":"Engineering","hostPictures":"https://randomuser.me/api/portraits/women/44.jpg","homePictures":"https://farm7.staticflickr.com/6076/6080657644_19cfe82456.jpg","cost":35},
{"name":"Madella Feathersby","zipcode":94110,"description":"great home with lots of space","dogSizePreference":"super extra large","dogBreedPreference":"Chihuahua","email":"hi@gmail.com","dogActivityPreference":"dapibus","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/women/45.jpg","homePictures":"https://farm1.staticflickr.com/68/187943195_05de9fe99b.jpg","cost":55},
{"name":"Thomasina Luscombe","zipcode":94123,"description":"great home with lots of space","dogSizePreference":"small","dogBreedPreference":"Dachshund","email":"hi@gmail.com","dogActivityPreference":"lacus","homeAttributes":"Sales","hostPictures":"https://randomuser.me/api/portraits/women/46.jpg","homePictures":"https://farm6.staticflickr.com/5510/14490433662_2745930345.jpg","cost":30},
{"name":"Shelley Philpot","zipcode":94106,"description":"great home with lots of space","dogSizePreference":"teeny weeny","dogBreedPreference":"German Shepherd","email":"hi@gmail.com","dogActivityPreference":"amet","homeAttributes":"Human Resources","hostPictures":"https://randomuser.me/api/portraits/women/47.jpg","homePictures":"https://farm4.staticflickr.com/3062/3046570389_f960000e36.jpg","cost":65},
{"name":"Isidora Hemms","zipcode":94110,"description":"great home with lots of space","dogSizePreference":"large","dogBreedPreference":"Pitbull","email":"hi@gmail.com","dogActivityPreference":"ipsum","homeAttributes":"Engineering","hostPictures":"https://randomuser.me/api/portraits/women/48.jpg","homePictures":"https://farm1.staticflickr.com/229/516113751_e2222a5a64.jpg","cost":30},
{"name":"Say Swinglehurst","zipcode":94123,"description":"great home with lots of space","dogSizePreference":"small","dogBreedPreference":"ROSIE","email":"hi@gmail.com","dogActivityPreference":"fusce","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/men/55.jpg","homePictures":"https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg","cost":57},
{"name":"Angus Bafford","zipcode":94106,"description":"great home with lots of space","dogSizePreference":"medium","dogBreedPreference":"CHUNKY","email":"hi@gmail.com","dogActivityPreference":"lorem","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/men/56.jpg","homePictures":"https://scontent.fsjc1-3.fna.fbcdn.net/v/t31.0-8/14500780_151623151960598_8947738040944491792_o.jpg?oh=c2362b13fe7e7e25c1b1c0cfc5319147&oe=5A7FDE71","cost":60},
{"name":"Breanne Carnoghan","zipcode":94110,"description":"great home with lots of space","dogSizePreference":"medium","dogBreedPreference":"Bloodhound","email":"hi@gmail.com","dogActivityPreference":"erat","homeAttributes":"Legal","hostPictures":"https://randomuser.me/api/portraits/men/57.jpg","homePictures":"https://farm4.staticflickr.com/3586/3468872496_d62d4580b9.jpg","cost":32},
{"name":"Fabio Handaside","zipcode":94123,"description":"great home with lots of space","dogSizePreference":"small","dogBreedPreference":"Mix","email":"hi@gmail.com","dogActivityPreference":"proin","homeAttributes":"Product Management","hostPictures":"https://randomuser.me/api/portraits/men/58.jpg","homePictures":"https://farm4.staticflickr.com/3193/2683030380_8ac4712010.jpg","cost":25},
{"name":"Lily Feake","zipcode":94106,"description":"great home with lots of space","dogSizePreference":"medium","dogBreedPreference":"All","email":"hi@gmail.com","dogActivityPreference":"vel","homeAttributes":"Training","hostPictures":"https://randomuser.me/api/portraits/men/59.jpg","homePictures":"https://farm4.staticflickr.com/3163/2780745441_a39b974e55.jpg","cost":55}
];

const mockCompleteUser = [
  {
    username: 'mary444',
    password: '1234',
    email: 'mary@test.com',
    name: 'Mary Tester',
    phone: '561-123-5155',
    address: '14 Main Street'
  }
];

// function to clean listings from database and seed with above mockData
const seedListingDB = () => {
  // remove listings to start
  Listing.remove({}, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('DATABASE SEED INIT: REMOVED PREVIOUS LISTINGS');
      // remove mary444 user from mock data above to prevent db collisions
      User.remove({'username': 'mary444'}, (err) => {
        if(err) {
          console.log(err);
        }
        let reformatUser = JSON.stringify(mockCompleteUser[0]);
        let newUser = new User(JSON.parse(reformatUser));
        // add mock data mary444
        newUser.save((err) => {
          if(err) {
            console.log(err);
          } else {
            console.log('DATABASE SEED: ADDED MOCK USER');
          }
        })
        // iterate over mock listings, format, and save into db
        listingsData.forEach((listing) => {
          // reformat data to strings for parsing before saving
          let reformatListing = JSON.stringify(listing);
          let newListing = new Listing(JSON.parse(reformatListing));
          newListing.save((err) => {
            if(err) {
              console.log(err);
            }
          })
        })
      })
      console.log('DATABASE SEED: ADDED MOCK LISTINGS');
    }
  })
}

module.exports = seedListingDB;
