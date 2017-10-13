var mongoose = require('mongoose');
var sitnpaws = require('../config')

//host listing schema
listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    zipcode: { type: Number, required: true },
    dogSizePreference: { type: String, required: true },
    dogBreedPreference: { type: String, required: true },
    dogActivityPreference: { type: String, required: true },
    homeAttributes: { type: String, required: true },
    hostPictures: { type: String, required: true },
    homePictures: { type: String, required: true },
    cost: { type: Number, required: true },
    yard: { type: String, required: true },
    children: { type: String, required: true },
    pets: { type: String, required: true },
  }
);

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
