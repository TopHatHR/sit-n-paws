import React from 'react';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginSubmit from '../utils/login';

export default class ProfileUpdate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      Name: '',
      Phone: '',
      Address: ''
    }

    this.handleEmailChange = (event) => {
      event.preventDefault();
      this.setState({Email: event.target.value});
    }

    this.handleNameChange = (event) => {
      event.preventDefault();
      this.setState({Name: event.target.value});
    }


    this.handlePhoneChange = (event) => {
      event.preventDefault();
      this.setState({Phone: event.target.value});
    }

    this.handleAddressChange = (event) => {
      event.preventDefault();
      this.setState({Address: event.target.value});
    }

    this.handleSubmit = (event) => {
      this.updateProfile(this.state);
    }

    this.updateProfile = (query) => {
      var url = 'http://localhost:3000/profile';
      LoginSubmit(url, query, (res) => {
        console.log('RES: ', res);
        if(res.success === true) {
          console.log('true');
        } else {
          console.log(res.error);
        }
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
          <input type="text" value={this.state.Email} onChange={this.handleEmailChange}/>
          <br />
          <br />
          <label>Name:</label>
          <input type="text" value={this.state.Name} onChange={this.handleNameChange}/>
          <br />
          <label>Phone:</label>
          <input type="text" value={this.state.Phone} onChange={this.handlePhoneChange}/>
          <br />
          <label>Address:</label>
          <input type="text" value={this.state.Address} onChange={this.handleAddressChange}/>
          </fieldset>
        </form>
        <br />
        <RaisedButton onClick={this.handleSubmit} type="submit" label="Submit Changes" primary={true} style={this.styles} />
        </div>
    );
  };
}