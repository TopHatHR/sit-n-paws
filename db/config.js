var mongoose = require('mongoose');

<<<<<<< HEAD
var url = process.env.MONGODB_URI ||'mongodb://127.0.0.1/sitnpaws';
=======
var url = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/sitnpaws';
>>>>>>> Changed hard-coded masterUrls to relative paths.
mongoose.connect(url);

var sitnpaws = mongoose.connection;

sitnpaws.on('error', console.error.bind(console, 'connection error:'));
sitnpaws.once('open', function () {
  console.log('connected to MongoDB');
});

module.exports = sitnpaws;
