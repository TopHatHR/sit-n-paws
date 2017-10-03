//host profile

var mongoose = require('mongoose');
var db = require('../config')

hostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  }
);

var Host = mongoose.model('Host', hostSchema)

// export default User;
module.exports = Host;
