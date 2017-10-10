export default function submitListing(url, formData, callback) {

  // post request for user login with user credentials object
  // the formData will be a FormData object
  // identical to utils/login.js, but without the headers
  // used in PostListing.js
  var options = {
    method: 'POST',
    body: formData
  };

  // this console.log is valuable when working with creating listings
  // console.log('POST SUBMITTED, formData');
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((errors) => {
      console.log('Login Error: ', errors);
    })
}
