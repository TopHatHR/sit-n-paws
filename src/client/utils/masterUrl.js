// masterUrl that can be changed depending on your server port
// used in listingView.js, login.js, main.js, PostListing.js

const masterUrl = process.env.HEROKU_URL + process.env.PORT || "http://localhost:3000";

export default masterUrl;
