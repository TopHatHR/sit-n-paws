import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './main.js';
import Login from './login.js';

// should have state that tracks login status

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loggedInAs: ''
    }

    this.handleLogin = (username) => {
      this.setState({isLoggedIn: true, loggedInAs: username});
    }
  }

  render() {
    // IS LOGGED IN
    if(this.state.isLoggedIn === true) {
      return (
        <div>
          <h1>Hello from LOGGED IN React</h1>
          <Main />

        </div>
      );

    } else {
    // LOGGED OUT
      return (
        <div>
          <h1>Hello from LOGGED OUT React</h1>
          <MuiThemeProvider>
            <Login
              handleLogin={this.handleLogin}
            />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}
