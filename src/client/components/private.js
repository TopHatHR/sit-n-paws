import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redirects to login if checkAuth returns false, else allows rendering of Main
const PrivateRoute = ({ component: Component, checkAuth }) => (
  <Route render={(props) => (
    checkAuth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login'
      }}/>
    )
  )}/>
)

export default PrivateRoute;
