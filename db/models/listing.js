//host listings

var mongoose = require('mongoose');
var db = require('../config')

listingSchema = new mongoose.Schema(
  {
    zipcode: { type: Number, required: true },
    dogPreferences: { type: String, required: true },
    homeAttributes: { type: String, required: true },
    hostPictures: { data: Buffer, contentType: String },
    homePictures: { data: Buffer, contentType: String },
    //cost per night
    cost: { type: Number, required: true }
    //user rating
  }
);

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;
