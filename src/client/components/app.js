import React from 'react';
import Main from './main.js';
import Login from './login.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div>
        <h1>Hello from React</h1>
        <Main />
        <Login />
      </div>
    );
  }
}
