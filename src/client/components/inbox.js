import React from 'react';
import ListingView from './listingView';
export default class InboxContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='messageBox'>
        <h3> New Messages </h3>
        <p> Message One </p>
        <p> Message Two </p>
        <p> Message Three </p>
        <h4> Send Message </h4>
        <input type="text"/>
      </div>
    );
  };
}