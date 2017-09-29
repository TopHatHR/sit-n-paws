import React from 'react';

// login form that takes username and password

const Login = (props) => {

  return (
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
    )
}

export default Login;