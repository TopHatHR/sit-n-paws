import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import submitDog from '../utils/submitDog.js';
import jwt from 'jsonwebtoken';
import masterUrl from '../utils/masterUrl.js';

export default class PostDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dogSize: '',
      dogBreed: '',
      dogActivityReq: '',
      bio: '',
      dogPictures: '',
      age: 0,
      submitted: false,
      error: null,
      message: 'Success, your doggo has been added to your profile!',
      userEmail: null
    }

    //handles input fields
    this.setField = (e) => {
      if (e.target.type === 'file') {
        this.setState({[e.target.name]: e.target.files[0]});
      } else {
        this.setState({[e.target.name]: e.target.value});
      }
    }

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
      formData.append("dogSize", this.state.dogSize);
      formData.append("dogBreed", this.state.dogBreed);
      formData.append("dogActivityReq", this.state.dogActivityReq);
      formData.append("bio", this.state.bio);
      formData.append("dogPictures", this.state.dogPictures);
      formData.append("age", this.state.age);
      formData.append("email", this.state.userEmail);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      let url = '/dog';

      submitDog(url, formData, (res) => {
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
    this.setState({userEmail: decoded.email})

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

                <label>Dog's name:</label><br />
                <input type="text" name="name" value={this.state.name} /><br />

                <label>Dog's size:</label><br />
                <input type="text" name="dogSize" value={this.state.dogSize} /><br />

                <label>Dog's breed:</label><br />
                <input type="text" name="dogBreed" value={this.state.dogBreed} /><br />

                <label>Dog's activity requirements (minutes/day)</label><br />
                <input type="text" name="dogActivityReq" value={this.state.dogActivityReq} /><br />

                <label>Dog's story:</label><br />
                <input type="text" name="bio" value={this.state.bio} /><br />

                <label>Dog's age:</label><br />
                <input type="text" name="age" value={this.state.age} /><br />

                <label htmlFor="dogPictures" className="postListing-fileLabel">{this.state.dogPictures ? this.state.dogPictures.name : `Choose a Picture of your dog`}</label><br />
                <input type="file" name="dogPictures" id="dogPictures" className="dogListing-file" /><br />
                </div>
              </div>
            <div>
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