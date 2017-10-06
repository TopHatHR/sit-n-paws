import React from 'react';
import PropTypes from 'prop-types';
import ListingView from './listingView';
export default class ListingsContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="wrapper">
        {this.props.listings.map((listing, i) => {
          console.log(this.props.query);
          // if (listing.zipcode)
          if (i < 10) {
            return (
              <ListingView listing={listing} key={listing.name} />
            )
          }
        })}
      </div>
    );
  };
}

ListingsContainer.propTypes = {listings: PropTypes.array.isRequired};
