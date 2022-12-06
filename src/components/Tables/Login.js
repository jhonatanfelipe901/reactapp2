import React from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {connection} from '../Connection'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: false };
  }

  handleValidSubmit = (event, values) => {
    this.setState({ email: values.email });
    console.log(`Login Successful`);
  };

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
    console.log(`Login failed`);
  };

  handleLogin = () => {
    this.props.onLogin(true);            
 };

  login = e => {
    console.log(this.state)
    fetch(`${connection}/api/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: this.state.username,
        Password: this.state.password
      })
    })
    .then(response => this.handleLogin())
    .catch(err => console.log(err))
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <AvForm
        onValidSubmit={this.login}
        onInvalidSubmit={this.login}
      >
        <AvField
          name="username"
          label="Username"
          type="text"
          onChange={this.onChangeUsername}
          validate={{
            required: true
          }}
          chan
        />
        <AvField
          name="password"
          label="Password"
          type="password"
          onChange={this.onChangePassword}
          validate={{
            required: {
              value: true,
              errorMessage: "Please enter your password"
            },
          }}
        />
        <Button id="submit">Submit</Button>
      </AvForm>
    );
  }
}
