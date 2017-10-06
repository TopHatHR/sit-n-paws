//dog owner profile

var mongoose = require('mongoose');
var db = require('../config')

ownersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dogName: { type: String, required: true },
    dogAge: { type: Number, required: true },
    dogTemperament: { type: String, required: true },
    dogInfo: { type: String, required: true }
  }
);

var Owner = mongoose.model('Owner', ownersSchema)

// export default User;
module.exports = Owner;
