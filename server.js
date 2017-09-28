const express = require('express');


const app = express();


app.use(express.static((__dirname + '/src/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
})





app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});
module.exports = app;
