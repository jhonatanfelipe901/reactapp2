import React from "react";
import { Button } from "reactstrap";
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
     <div></div>
    );
  }
}
