import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import submitListing from '../utils/submitListing.js';
import jwt from 'jsonwebtoken';
import masterUrl from '../utils/masterUrl.js';

export default class PostListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      zipcode: '',
      dogSizePreference: '',
      dogBreedPreference: '',
      dogActivityPreference: '',
      pets: '',
      children: '',
      homeAttributes: '',
      yard: '',
      hostPictures: null,
      homePictures: null,
      cost: '',
      submitted: false,
      error: null,
      message: 'Thank you, your listing has been successfully submitted!'
    }

    //handles input fields
    this.setField = (e) => {
      if (e.target.type === 'file') {
        this.setState({[e.target.name]: e.target.files[0]});
      } else {
        this.setState({[e.target.name]: e.target.value});
      }
    }
//decoded.email in didcomponentmount
    this.handleSubmit = () => {
      for (let key in this.state) {
        if (this.state[key] === '') {
          console.log('Form Error ', key);
          this.setState({error: `The following field is required: ${key}`});
          return;
        }
      }
      let formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", this.state.email);
      formData.append("zipcode", this.state.zipcode);
      formData.append("dogSizePreference", this.state.dogSizePreference);
      formData.append("dogBreedPreference", this.state.dogBreedPreference);
      formData.append("dogActivityPreference", this.state.dogActivityPreference);
      formData.append("homeAttributes", this.state.homeAttributes);
      formData.append("hostPictures", this.state.hostPictures);
      formData.append("homePictures", this.state.homePictures);
      formData.append("cost", this.state.cost);
      formData.append("yard", this.state.yard);
      formData.append("pets", this.state.pets);
      formData.append("children", this.state.children);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      let url = '/listings';

      submitListing(url, formData, (res) => {
        if (res.success === true) {
          console.log('Listing submitted!');
          this.setState({message: res.message});
          this.setState({submitted: true});
        } else {
          console.log('Error: ', res.error);
        }
      });
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('jwt');
    let decoded = jwt.decode(token);
    this.setState({name: decoded.name});
    this.setState({email: decoded.email});
  }

  render() {
    if (this.state.submitted === true) {
      return (
        <h1> {this.state.message} </h1>
      )
    } else {
      return (
        <div>
          {this.state.error ? <p className="postListing-error">{this.state.error}</p> : ''}
          <form onChange={this.setField} onSubmit={this.handleSubmit}>
            <div className="postListing">
              <div className="postListing-label">

                <label>Name:</label><br />
                <input type="text" name="name" value={this.state.name} /><br />

                {/* <label>Email:</label><br />
                <input type="text" name="email" value={this.state.email} /><br />
                get email from user profile
                */}

                <label>Zip Code:</label><br />
                <input type="number" name="zipcode" value={this.state.zipcode} /><br />

                <label>Dog Size Preference</label><br />
                <input type="text" name="dogSizePreference" value={this.state.dogSizePreference} /><br />

                <label>Dog Breed Preference:</label><br />
                <input type="text" name="dogBreedPreference" value={this.state.dogBreedPreference} /><br />

                <label>Dog Activity Preferences:</label><br />
                <input type="text" name="dogActivityPreference" value={this.state.dogActivityPreference} /><br />

                <label>Yard Size: </label><br />
                <input type="text" name="yard" value={this.state.yard} /><br />

              </div>
              <div className="postListing-label">


                <label>Pets: </label><br />
                <input type="text" name="pets" value={this.state.pets} /><br />

                <label>Children: </label><br />
                <input type="text" name="children" value={this.state.children} /><br />

                <label>Cost Per Night: </label><br />
                <input type="text" name="cost" value={this.state.cost} /><br />

                <label>Description:</label><br />
                <textarea type="text" name="homeAttributes" value={this.state.homeAttributes} /><br />

                <label htmlFor="hostPictures" className="postListing-fileLabel">{this.state.hostPictures ? this.state.hostPictures.name : `Choose a Picture of you`}</label><br />
                <input type="file" name="hostPictures" id="hostPictures" className="postListing-file" /><br />

                <label htmlFor="homePictures" className="postListing-fileLabel">{this.state.homePictures ? this.state.homePictures.name : `Choose a Picture of your home`}</label><br />
                <input type="file" name="homePictures" id="homePictures" className="postListing-file" /><br />
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
//no more email
//change Description:
  //yard Size
  //pets?
  //children?
  //
