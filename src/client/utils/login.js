export default function LoginSubmit(credentials, callback) {

  // post request for user login with user credentials object
  var options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };

  console.log('POST SUBMITTED');
  fetch('url', options)
    .then((res) => {
      callback(res);
    })
    .catch((errors) => {
      console.log('Login Error: ', errors);
    })

}