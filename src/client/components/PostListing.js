import React from 'react';
import PropTypes from 'prop-types';



export default class PostListing extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>

        <h1>Sign up to become a pet host!</h1>
        <form>
          <label>Name:</label>
          <input type="text" /><br />

          <label>Zip Code:</label>
          <input type="number" /><br />

          <label>Dog Size Preferences</label>
          <input type="String" /><br />

          <label>Dog Temperament Preferences</label>
          <input type="String" /><br />

          <label>Dog Activity Preferences</label>
          <input type="String" /><br />

          <label>Home Attributes</label>
          <textarea type="String" /><br />

          <label>Picture of you: (URL)</label>
          <input type="String" /><br />

          <label>Picture of your home: (URL)</label>
          <input type="String" /><br />

        </form>

      </div>
    );
  };
}


PostListing.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired

};
