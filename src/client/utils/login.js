export default function LoginSubmit(url, credentials, callback) {

  // post request for user login with user credentials object
  // the credentials object will be at a minimum username and password
  // used in components login.js to flexibly handle login AND register
  var options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };

  // this console.log is valuable when working with login/register
  // console.log('POST SUBMITTED, credentials');
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((errors) => {
      console.log('Login Error: ', errors);
    })
}
