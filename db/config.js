var mongoose = require('mongoose');

var url = 'mongodb://127.0.0.1/db'; 
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to MongoDB');
});

module.exports = db;
