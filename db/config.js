var mongoose = require('mongoose');

var url = 'mongodb://localhost:3000/'; //UPDATE LINK
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to MongoDB');
});

module.exports = db;
