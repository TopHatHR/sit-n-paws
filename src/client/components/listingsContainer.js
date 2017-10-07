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
<<<<<<< 1cb806e5fa20dad5a5b9fe4d8d0245577dc8fa84
            return (
              <ListingView listing={listing} key={listing.name} />
            )
          }
        )}
=======


            return (
              <ListingView listing={listing} key={listing.name} />
            )

        })}
>>>>>>> Removed cap of 10 on listings
      </div>
    );
  };
}

ListingsContainer.propTypes = {listings: PropTypes.array.isRequired};
