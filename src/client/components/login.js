import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginSubmit from '../utils/login';

// login form that takes username and password

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      username: '',
      password: '',
    }

    this.handleOpen = () => {
      this.setState({open: true});
    }

    this.handleClose = () => {
      this.setState({open: false});
    }

    this.handleSubmit = () => {
      var credentials = {
        username: this.state.username,
        password: this.state.password
      };
      LoginSubmit(credentials)
      // this.setState({open: false});
    }

    this.handleUsernameChange = (e) => {
      this.setState({username: e.target.value});
    }

    this.handlePasswordChange = (e) => {
      this.setState({password: e.target.value});
    }

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.handleSubmit();
          this.handleClose();
        }}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onClick={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div>
            <h1>LOGIN</h1>
            <form>
              <label>username</label>
              <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
              <label>password</label>
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              <input type="submit" value="login" />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}


// const Login = (props) => {

//   return (
//       <div>
//         <h1>LOGIN</h1>
//         <form>
//           <label>username</label>
//           <input type="text" />
//           <label>password</label>
//           <input type="password" />
//           <input type="submit" value="login" />
//         </form>
//       </div>
//     )
// }


// export default Login;

