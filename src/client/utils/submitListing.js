export default function submitListing(url, formData, callback) {

  // post request for user login with user credentials object

  var options = {
    method: 'POST',
    body: formData,
    // headers: new Headers({
    //   'Content-Type': 'multipart/form-data'
    // })
  };

  console.log('POST SUBMITTED', formData);
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {

      console.log('DATA: ', data);


      callback(data);
    })
    .catch((errors) => {
      console.log('Login Error: ', errors);
    })

}
