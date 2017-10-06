import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import jwt from 'jsonwebtoken';
import LoginSubmit from '../utils/login';

// login form that takes username and password

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      username: '',
      password: '',
      registerUsername: '',
      registerPassword: '',
      registerEmail: ''
    }

    this.handleOpen = () => {
      this.setState({open: true});
    }

    this.handleClose = () => {
      this.setState({open: false});
    }

    this.handleSubmit = (e, register) => {
      if(register === 'register') {

        var url = 'http://localhost:3000/signup';
        var credentials = {
          username: this.state.registerUsername,
          password: this.state.registerPassword,
          email: this.state.registerEmail
        };
      } else {

        var url = 'http://localhost:3000/login';
        var credentials = {
          username: this.state.username,
          password: this.state.password
        };
      }

      // CALLBACK TO SET PARENT STATE AS LOGGED IN
      LoginSubmit(url, credentials, (res) => {
        console.log('RES: ', res);
        if(res.success === true) {
          localStorage.setItem('jwt', res.token);
          let decoded = jwt.decode(res.token);
          console.log('DECODED: ', decoded);
          props.handleLogin();
          props.history.push('/main');
        } else {
          console.log(res.error);
          props.history.push('/main');
        }
      })
    }

    this.handleUsernameChange = (e, register) => {
      if(register === 'register') {
        this.setState({registerUsername: e.target.value});
      } else {
        this.setState({username: e.target.value});
      }
    }

    this.handlePasswordChange = (e, register) => {
      if(register === 'register') {
        this.setState({registerPassword: e.target.value});
      } else {
        this.setState({password: e.target.value});
      }
    }

    this.handleEmailChange = (e) => {
      this.setState({registerEmail: e.target.value});
    }

  }

  render() {

    return (
      <MuiThemeProvider>
      <div>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <div className="wrapper">

            <div>
              <h1>LOGIN</h1>
              <form>
                <label>username</label>
                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                <br />
                <label>password</label>
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </form>
              <div className="dialogButton">
                <FlatButton
                  label="Submit"
                  primary={true}
                  onClick={() => {
                    this.handleSubmit();
                    this.handleClose();
                  }}
                />
              </div>
            </div>

            <div>
              <h1>REGISTER</h1>
              <form>
                <label>email</label>
                <input type="email" value={this.state.registerEmail} onChange={(e) => this.handleEmailChange(e)} />
                <br />
                <label>username</label>
                <input type="text" value={this.state.registerUsername} onChange={(e) => this.handleUsernameChange(e, 'register')} />
                <br />
                <label>password</label>
                <input type="password" value={this.state.registerPassword} onChange={(e) => this.handlePasswordChange(e, 'register')} />
              </form>
              <div className="dialogButton">
                <FlatButton
                  label="Register"
                  primary={true}
                  onClick={(e) => {
                    this.handleSubmit(e, 'register');
                    this.handleClose();
                  }}
                />
              </div>
            </div>
          </div>
        </Dialog>
       </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {handleLogin: PropTypes.func.isRequired};
