import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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