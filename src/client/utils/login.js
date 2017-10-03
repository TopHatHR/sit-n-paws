export default function LoginSubmit(url, credentials, callback) {

  // post request for user login with user credentials object
  var options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };

  console.log('POST SUBMITTED', credentials);
  fetch(url, options)
    .then((res) => {
      callback(JSON.parse(res));
    })
    .catch((errors) => {
      console.log('Login Error: ', errors);
    })

}