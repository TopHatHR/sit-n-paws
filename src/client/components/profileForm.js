import React from 'react';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginSubmit from '../utils/login';
import masterUrl from '../utils/masterUrl.js';


export default class ProfileUpdate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      phone: '',
      address: '',
      renderState: false,
    }

    // Handles form fields
    this.setField = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    // Updates profile on clicking submit button (Incomplete);
    this.updateProfile = () => {
      console.log('Update profile');
      let data = this.state;
      this.setState({renderState: !this.state.renderState})
      var url = '/profile';
      var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((errors) => {
          console.log('Login Error: ', errors);
      });
    }
  }

  // Form for updateProfile
  render() {
    return (
      <div className='profileBox'>
        <h1>Edit Your Profile</h1>
        <form onChange={this.setField}>
          <fieldset>
            <legend>Enter Your Email</legend>
            <br />
            <input type="text" value={this.state.email} name="email" />
            <br />
            <br />
            <label>Name:</label>
            <input type="text" value={this.state.name} name="name" />
            <br />
            <label>Phone:</label>
            <input type="text" value={this.state.phone} name="phone" />
            <br />
            <label>Address:</label>
            <input type="text" value={this.state.address} name="address" />
          </fieldset>
        </form>
        <br />
        <RaisedButton onClick={this.updateProfile} type="submit" label="Submit Changes" primary={true} style={this.styles} />
        </div>
    );
  };
}
