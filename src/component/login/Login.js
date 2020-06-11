import React from "react";
import Loginform from "../../containers/login";

class Login extends React.Component {
  componentDidMount() {
    document.title = "Login";
  }
  render() {
    return (
      <div className="body-form custom-form">
        <div className="page_title">
          <h3>Login</h3>
        </div>
        <hr />
        <Loginform/>
      </div>
    );
  }
}

export default Login;
