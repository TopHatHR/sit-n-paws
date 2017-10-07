import React from 'react';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginSubmit from '../utils/login';

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

    this.handleEmailChange = (event) => {
      event.preventDefault();
      this.setState({email: event.target.value});
    }

    this.handleNameChange = (event) => {
      event.preventDefault();
      this.setState({name: event.target.value});
    }


    this.handlePhoneChange = (event) => {
      event.preventDefault();
      this.setState({phone: event.target.value});
    }

    this.handleAddressChange = (event) => {
      event.preventDefault();
      this.setState({address: event.target.value});
    }

    this.handleSubmit = (event) => {
      this.updateProfile(this.state);
      this.setState({renderState: !this.state.renderState})
    }

    this.updateProfile = (query) => {
      console.log(query)
      var url = 'http://localhost:3000/profile';
      var options = {
        method: 'POST',
        body: JSON.stringify(query),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };

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
  }

  render() {
    return (
      <div className='profileBox'>
        <h1>Edit Your Profile</h1>
        <form>
        <fieldset>
          <legend>Enter Your Email</legend>
          <br />
          <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
          <br />
          <br />
          <label>Name:</label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
          <br />
          <label>Phone:</label>
          <input type="text" value={this.state.phone} onChange={this.handlePhoneChange}/>
          <br />
          <label>Address:</label>
          <input type="text" value={this.state.address} onChange={this.handleAddressChange}/>
          </fieldset>
        </form>
        <br />
        <RaisedButton onClick={this.handleSubmit} type="submit" label="Submit Changes" primary={true} style={this.styles} />
        </div>
    );
  };
}
