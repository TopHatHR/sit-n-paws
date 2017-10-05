import React from 'react';
import PropTypes from 'prop-types';
import FileInput from 'react-file-input';

export default class PostListing extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <form>
          <label>Name:</label>
          <input type="text"  />

          <label>Zip Code:</label>
          <input type="number" />

          <label>Dog Size Preferences</label>
          <input type="String" />

          <label>Dog Temperament Preferences</label>
          <input type="String" />

          <label>Dog Activity Preferences</label>
          <input type="String" />

          <label>Home Attributes</label>
          <input type="String" />

          <label>Picture of you</label>
          <FileInput name="ProfilePicture" accept=".jpg,.png,.gif" onChange={this.handleHostPic} />

          <label>Picture of your home</label>
          <FileInput name="HomePicture" accept=".jpg,.png,.gif" onChange={this.handleHostPic} />

        </form>

      </div>
    );
  };
}
