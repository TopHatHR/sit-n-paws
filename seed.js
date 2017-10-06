// import mongoose, config, and listing schema
const mongoose = require('mongoose');
const Listing = require('./db/models/listing');

// seed data
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

// function to clean listings from database and seed with above listingsData
const seedListingDB = () => {
  Listing.remove({}, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('DATABASE SEED INIT: REMOVED PREVIOUS LISTINGS');

      listingsData.forEach((listing) => {
        // reformat data to strings for parsing before saving
        let reformatListing = JSON.stringify(listing);
        let newListing = new Listing(JSON.parse(reformatListing));

        newListing.save((err) => {
          if(err) {
            console.log(err);
          } else {
            console.log('DATABASE SEED SUCCESS: ADDED MOCK LISTINGS');
          }
        })
      })
    }
  })
}

module.exports = seedListingDB;
