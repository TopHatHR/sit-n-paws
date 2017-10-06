import React from 'react';

const NotFound = (props) => (
  <div>
    <h1>404 - NOT FOUND Route</h1>
    <button onClick={ props.history.goBack }>Go Back</button>
  </div>
)

export default NotFound;