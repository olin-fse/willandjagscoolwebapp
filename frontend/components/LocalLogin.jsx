import React, { Component } from "react";

class LocalLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'jag',
      password: 'password'
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.validateForm = this.validateForm.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  // validateForm() {
  //   return this.state.user.length > 0 && this.state.password.length > 0;
  // }

  onLogin(e) {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    }

    console.log(JSON.stringify(data));

    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then((response) => { return response.json(); })
      .then((json) => { this.props.setUser(json.user); });
  }

  render(){
    return (
      <form id="local-login" className="form-signin" onSubmit={this.onLogin}>
        <h2>Log In to an Existing Account</h2>
        <input
          placeholder="Username"
          value={this.state.username}
          min
          onChange={this.handleUsernameChange}
        />
        <br />
        <input
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />
        <button
          type="submit"
          value="Login"
          //disabled={!this.validateForm()}
        >
        Login
        </button>
      </form>
    );
  }
}

export default LocalLogin;
