import React from 'react';

const NotFound = (props) => (
  <div className="messageBox">
    <div className="puppy404"></div>
    <h1 className="header404">404 - NOT FOUND</h1>
    <button className="button404" onClick={ props.history.goBack }>Go Back</button>
  </div>
)

export default NotFound;