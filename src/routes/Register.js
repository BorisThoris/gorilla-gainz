import React from "react";
import { Checkbox, Button } from "antd";

import notify from "../services/notify.js";
import auth from "../services/authService.js";

export default class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    repeatPass: "",
    isAdmin: false
  };

  onChange = e => {
    if (e.target.name === "isAdmin") {
      this.setState({
        [e.target.name]: e.target.checked
      });
      console.log(e.target.name);
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  onSubmit = () => {
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let repeatPassword = this.state.repeatPass;
    let isAdmin = this.state.isAdmin;
    let profilePic =
      "https://cdn.playbuzz.com/cdn//5918be09-9cb6-4b9c-8aed-09a6c067c333/e2224e33-3938-4898-8087-47dc5b04cb0a.jpg";

    if (username.length < 3) {
      notify.showError("Username Should Be Longer!");
    } else if (password.length < 8) {
      notify.showError("Password Should Be Longer!");
    } else if (password !== repeatPassword) {
      notify.showError("Passwords Must Match!");
    } else {
      auth
        .register(username, password, isAdmin, profilePic)
        .then(userData => {
          notify.showInfo("Registered");
          window.location = "login";
        })
        .catch(() => notify.showError("Register Error"));
    }
  };

  render() {
    return (
      <div id="manage">
        <center>
          <form action="#/register" method="post" id="registerForm">
            <label>
              Username:
              <input
                type="text"
                name="username"
                onChange={e => this.onChange(e)}
                value={this.state.usernamel}
              />
            </label>
            <br />

            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={e => this.onChange(e)}
                value={this.state.password}
              />
            </label>
            <br />

            <label>
              Password Check:
              <input
                type="password"
                name="repeatPass"
                onChange={e => this.onChange(e)}
                value={this.state.repeatPass}
              />
            </label>
            <br />

            {/*checkbox*/}
            <Checkbox
              name="isAdmin"
              checked={this.state.isAdmin}
              onChange={e => this.onChange(e)}
            >
              Admin?
            </Checkbox>
            <br />

            {/*button*/}
            <Button
              id="btnRegister"
              onClick={() => this.onSubmit()}
              type="submit"
            >
              Register
            </Button>
          </form>
        </center>
        <br />>
      </div>
    );
  }
}
