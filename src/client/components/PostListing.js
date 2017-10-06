import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import loginSubmit from '../utils/login.js';


export default class PostListing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      zipcode: '',
      dogSizePreference: '',
      dogBreedPreference: '',
      dogTemperamentPreference: '',
      dogActivityPreference: '',
      homeAttributes: '',
      hostPictures: '',
      homePictures: '',
      cost: '',
      submitted: false,
      error: null
    }

    this.setField = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    this.handleSubmit = () => {
      for (let key in this.state) {
        if (this.state[key] === '') {
          console.log('Form Error ', key);
          this.setState({error: `The following field is required: ${key}`});
          return;
        }
      }

      let url = 'http://localhost:3000/listings'
      loginSubmit(url, this.state, (res) => {
        if (res.success === true) {
          console.log('Listing submitted!');
          this.setState({submitted: true});
        } else {
          console.log('Error: ', res.error);
        }
      });

    }

  }

  render() {
    if (this.state.submitted === true) {
      return (
        <h1> Thank you, your posting has been successfully submitted! </h1>
      )
    } else {
      return (
        <div>

          <h1>Sign up to become a pet host:</h1>
          {this.state.error ? <p className="postListing-error">{this.state.error}</p> : ''}
          <form onChange={this.setField} onSubmit={this.handleSubmit}>
            <div className="postListing">
              <div className="postListing-label">
                <label>Name:</label><br />
                <input type="text" name="name" value={this.state.name} /><br />

                <label>Zip Code:</label><br />
                <input type="number" name="zipcode" value={this.state.zipcode} /><br />

                <label>Dog Size Preference</label><br />
                <input type="text" name="dogSizePreference" value={this.state.dogSizePreference} /><br />

                <label>Dog Temperament Preference:</label><br />
                <input type="text" name="dogTemperamentPreference" value={this.state.dogTemperamentPreference} /><br />

                <label>Dog Breed Preference:</label><br />
                <input type="text" name="dogBreedPreference" value={this.state.dogBreedPreference} /><br />
              </div>
              <div className="postListing-label">
                <label>Dog Activity Preferences:</label><br />
                <input type="text" name="dogActivityPreference" value={this.state.dogActivityPreference} /><br />

                <label>Description:</label><br />
                <textarea type="text" name="homeAttributes" value={this.state.homeAttributes} /><br />

                <label>Picture of you: (URL)</label><br />
                <input type="text" name="hostPictures" value={this.state.hostPictures} /><br />

                <label>Picture of your home: (URL)</label><br />
                <input type="text" name="homePictures" value={this.state.homePictures} /><br />

                <label>Cost Per Night: </label><br />
                <input type="text" name="cost" value={this.state.cost} /><br />

              </div>
            </div>
            <div >
              <FlatButton
              className="postListing-submit"
              label="Submit"
              primary={true}
              onClick={() => {
                this.handleSubmit();
              }}
              />
            </div>
          </form>

        </div>
      );
    };
  };
}
