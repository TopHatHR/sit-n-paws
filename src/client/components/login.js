import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import jwt from 'jsonwebtoken';
import LoginSubmit from '../utils/login';
import masterUrl from '../utils/masterUrl.js';

// login form that takes username and password
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    // login and register forms are tracked with separate states
    this.state = {
      username: '',
      password: '',
      registerUsername: '',
      registerPassword: '',
      registerEmail: ''
    }

    // This single submit function handles both the submit and the register
    // Default is login. If 'register' is passed as an argument, it executes the register post instead.
    this.handleSubmit = (e, register) => {
      if(register === 'register') {
        var url = masterUrl + '/signup';
        var credentials = {
          username: this.state.registerUsername,
          password: this.state.registerPassword,
          email: this.state.registerEmail
        };

      } else {
        var url = masterUrl + '/login';
        var credentials = {
          username: this.state.username,
          password: this.state.password
        };
      }

      // Calls LoginSubmit function in utils, if crentials are correct, server
      // replies with a jwt, which is then stored in localStorage.
      LoginSubmit(url, credentials, (res) => {
        if(res.success === true) {
          localStorage.setItem('jwt', res.token);
          props.history.push('/main');
        } else {
          console.log(res.error);
          props.history.push('/main');
        }
      })
    }

    // This handles the field changes for the forms
    this.setField = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

  }

  // Login component checks for presence of jwt before it loads, if exists, redirects user to main
  componentWillMount() {
    let token = localStorage.getItem('jwt');
    if (token !== "undefined" && token !== null && token !== undefined) {
      this.props.history.push('/main');
    }
  }

  // MuiThemeProvider is required for material-ui themes
  // These are the forms for login and registration
  render() {
    return (
      <MuiThemeProvider>
      <div>
          <div className="wrapper login-forms-container">
            <div className="login-forms">
              <h1>LOGIN</h1>
              <form onChange={this.setField}>
                <label>username</label>
                <input type="text" name="username" value={this.state.username}/>
                <br />
                <label>password</label>
                <input type="password" name="password" value={this.state.password}/>
                <div className="login-form-welcomeBack">
                  <em>Welcome Back!</em>
                </div>
              </form>
              <div className="login-form-button">
                <FlatButton
                  label="Submit"
                  primary={true}
                  onClick={() => {
                    this.handleSubmit();
                  }}
                />
              </div>
            </div>

            <div className="login-forms">
              <h1>REGISTER</h1>
              <form onChange={this.setField}>
                <label>email</label>
                <input type="email" name="registerEmail" value={this.state.registerEmail} />
                <br />
                <label>username</label>
                <input type="text" name="registerUsername" value={this.state.registerUsername} />
                <br />
                <label>password</label>
                <input type="password" name="registerPassword" value={this.state.registerPassword} />
              </form>
              <div className="login-form-button">
                <FlatButton
                  label="Register"
                  primary={true}
                  onClick={(e) => {
                    this.handleSubmit(e, 'register');
                  }}
                />
              </div>
            </div>
          </div>
       </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {handleLogin: PropTypes.func.isRequired};
