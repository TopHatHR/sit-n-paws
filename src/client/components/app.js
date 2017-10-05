import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './main.js';
import Login from './login.js';
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
      // this.setState({isLoggedIn: true, loggedInAs: username});
      let token = localStorage.getItem('jwt');
      console.log("AuthLOGIN RAN", token);
      if (token !== "undefined" && token !== null && token !== undefined) {
        let decoded = jwt.decode(token);
        this.setState({loggedInAs: decoded.username});
        this.setState({isLoggedIn: true});
        return true;
      } else {
        return false;
      }
      // If no token is found and/or success is false
        // return false
    }
  }

  componentWillMount() {
    this.setState({isLoggedIn: this.authLogin()});
  }

  render() {
    // IS LOGGED IN
    if(this.state.isLoggedIn) {
      return (
        <div>
          <MuiThemeProvider>
            <Main />
          </MuiThemeProvider>

        </div>
      );

    } else {
    // LOGGED OUT
      return (
        <div>
          <h1>Hello from LOGGED OUT React</h1>
          <MuiThemeProvider>
            <Login
              handleLogin={this.authLogin}
            />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}
