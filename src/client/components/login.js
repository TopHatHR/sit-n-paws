import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
      console.log('SUBMITTED');
      // this.setState({open: false});
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
              <input type="text" />
              <label>password</label>
              <input type="password" />
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