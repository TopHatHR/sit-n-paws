import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';


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

          <label>Picture of you: (URL)</label>
          <input type="String" />

          <label>Picture of your home: (URL)</label>
          <input type="String" />

        </form>

      </div>
    );
  };
}


PostListing.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired

};
