// import mongoose, config, and listing schema
const mongoose = require('mongoose');
const Listing = require('./db/models/listing');

// seed data
const listingsData = [
{"name":"Jo ann Greatham","zipcode":94106,"dogSizePreference":"XL","dogBreedPreference":"Castor canadensis","dogTemperamentPreference":"Synergized","dogActivityPreference":"rutrum","homeAttributes":"Engineering","hostPictures":"https://randomuser.me/api/portraits/women/44.jpg","homePictures":"https://farm7.staticflickr.com/6076/6080657644_19cfe82456.jpg","cost":35},
{"name":"Madella Feathersby","zipcode":94110,"dogSizePreference":"XL","dogBreedPreference":"Haematopus ater","dogTemperamentPreference":"Proactive","dogActivityPreference":"dapibus","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/women/45.jpg","homePictures":"https://farm1.staticflickr.com/68/187943195_05de9fe99b.jpg","cost":55},
{"name":"Thomasina Luscombe","zipcode":94123,"dogSizePreference":"2XL","dogBreedPreference":"Felis concolor","dogTemperamentPreference":"Cloned","dogActivityPreference":"lacus","homeAttributes":"Sales","hostPictures":"https://randomuser.me/api/portraits/women/46.jpg","homePictures":"https://farm6.staticflickr.com/5510/14490433662_2745930345.jpg","cost":30},
{"name":"Shelley Philpot","zipcode":94106,"dogSizePreference":"3XL","dogBreedPreference":"Ovis ammon","dogTemperamentPreference":"task-force","dogActivityPreference":"amet","homeAttributes":"Human Resources","hostPictures":"https://randomuser.me/api/portraits/women/47.jpg","homePictures":"https://farm4.staticflickr.com/3062/3046570389_f960000e36.jpg","cost":65},
{"name":"Isidora Hemms","zipcode":94110,"dogSizePreference":"2XL","dogBreedPreference":"Psophia viridis","dogTemperamentPreference":"Seamless","dogActivityPreference":"ipsum","homeAttributes":"Engineering","hostPictures":"https://randomuser.me/api/portraits/women/48.jpg","homePictures":"https://farm1.staticflickr.com/229/516113751_e2222a5a64.jpg","cost":30},
{"name":"Say Swinglehurst","zipcode":94123,"dogSizePreference":"L","dogBreedPreference":"Bucorvus leadbeateri","dogTemperamentPreference":"Expanded","dogActivityPreference":"fusce","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/men/55.jpg","homePictures":"https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg","cost":57},
{"name":"Angus Bafford","zipcode":94106,"dogSizePreference":"L","dogBreedPreference":"Bucephala clangula","dogTemperamentPreference":"Progressive","dogActivityPreference":"lorem","homeAttributes":"Support","hostPictures":"https://randomuser.me/api/portraits/men/56.jpg","homePictures":"https://farm4.staticflickr.com/3612/3676181861_66705f1ace.jpg","cost":60},
{"name":"Breanne Carnoghan","zipcode":94110,"dogSizePreference":"M","dogBreedPreference":"Hystrix cristata","dogTemperamentPreference":"interface","dogActivityPreference":"erat","homeAttributes":"Legal","hostPictures":"https://randomuser.me/api/portraits/men/57.jpg","homePictures":"https://farm4.staticflickr.com/3586/3468872496_d62d4580b9.jpg","cost":32},
{"name":"Fabio Handaside","zipcode":94123,"dogSizePreference":"3XL","dogBreedPreference":"Oryx gazella callotis","dogTemperamentPreference":"Polarised","dogActivityPreference":"proin","homeAttributes":"Product Management","hostPictures":"https://randomuser.me/api/portraits/men/58.jpg","homePictures":"https://farm4.staticflickr.com/3193/2683030380_8ac4712010.jpg","cost":25},
{"name":"Lily Feake","zipcode":94106,"dogSizePreference":"M","dogBreedPreference":"Canis mesomelas","dogTemperamentPreference":"time-frame","dogActivityPreference":"vel","homeAttributes":"Training","hostPictures":"https://randomuser.me/api/portraits/men/59.jpg","homePictures":"https://farm4.staticflickr.com/3163/2780745441_a39b974e55.jpg","cost":55}
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
