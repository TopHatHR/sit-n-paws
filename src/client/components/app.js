import React from 'react';
import { BrowserRouter, Switch, Route, browserHistory } from 'react-router-dom';
import Home from './home.js';
import Main from './main.js';
import Login from './login.js';
import NotFound from './notfound.js';
import PrivateRoute from './private.js';
import jwt from 'jsonwebtoken';

// should have state that tracks login status

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInAs: '',
      isLoggedIn: null
    }
    // handleLogout
    // localStorage.removeItem(key);

    this.authLogin = () => {
      let token = localStorage.getItem('jwt');
      console.log("AuthLOGIN RAN", token);
      if (token !== "undefined" && token !== null && token !== undefined) {
        let decoded = jwt.decode(token);
        // this.setState({loggedInAs: decoded.username});
        // this.setState({isLoggedIn: true});
        return true;
      } else {
        return false;
      }
      // If no token is found and/or success is false
        // return false
    }
  }

  render() {
    return(
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' render={(props) => (
          <Login {...props}
          handleLogin={this.authLogin}
          />
          )}/>
        <PrivateRoute path='/main' checkAuth={this.authLogin} component={Main}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
    )
  }
}
