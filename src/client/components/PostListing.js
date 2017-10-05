import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';


export default class PostListing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      zipcode: '',
      dogSizePreference: '',
      dogBreedPreference: '',
      dogTemperatmentPreference: '',
      dogActivityPreference: '',
      homeAttributes: '',
      hostPictures: '',
      homePictures: '',
      cost: ''

    }

    this.setField = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    this.handleSubmit = () => {
      console.log(this.state);
    }

  }

  render() {
    return (
      <div>

        <h1>Sign up to become a pet host:</h1>
        <form onChange={this.setField} onSubmit={this.handleSubmit}>
          <div className="postListing">
            <div className="postListing-label">
              <label>Name:</label><br />
              <input type="text" name="name" value={this.state.name} /><br />

              <label>Zip Code:</label><br />
              <input type="number" name="zipcode" value={this.state.zipcode} /><br />

              <label>Dog Size Preferences</label><br />
              <input type="text" name="dogSizePreference" value={this.state.dogSizePreference} /><br />

              <label>Dog Temperament Preferences</label><br />
              <input type="text" name="dogTemperatmentPreference" value={this.state.dogTemperatmentPreference} /><br />
            </div>
            <div className="postListing-label">
              <label>Dog Activity Preferences</label><br />
              <input type="text" name="dogActivityPreference" value={this.state.dogActivityPreference} /><br />

              <label>Home Attributes</label><br />
              <textarea type="text" name="homeAttributes" value={this.state.homeAttributes} /><br />

              <label>Picture of you: (URL)</label><br />
              <input type="text" name="hostPictures" value={this.state.hostPictures} /><br />

              <label>Picture of your home: (URL)</label><br />
              <input type="text" name="homePictures" value={this.state.homePictures} /><br />

              <div className="dialogButton">
                <FlatButton
                  label="Submit"
                  primary={true}
                  onClick={() => {
                    this.handleSubmit();
                    this.props.handleClose();
                  }}
                />
              </div>
            </div>
          </div>
        </form>

      </div>
    );
  };
}


PostListing.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired

};
