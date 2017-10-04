import React from 'react';
import ListingView from './listingView';
export default class ListingsContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="wrapper">
        <ListingView />
        <ListingView />
      </div>
    );
  };
}
