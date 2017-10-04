var mongoose = require('mongoose');

var url = 'mongodb://127.0.0.1/sitnpaws';
mongoose.connect(url);

var sitnpaws = mongoose.connection;

sitnpaws.on('error', console.error.bind(console, 'connection error:'));
sitnpaws.once('open', function () {
  console.log('connected to MongoDB');
});

module.exports = sitnpaws;
