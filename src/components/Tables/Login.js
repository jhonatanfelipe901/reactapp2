import React from "react";
import {connection} from '../Connection'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
    e.preventDefault();

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
    this.setState({username: e.value})
  }

  onChangePassword = e => {
    this.setState({password: e.value})
  }

  render() {
    return (
     <div>
      <Form onSubmit={this.login}>
          <FormGroup>
            <Label for="Name">Username</Label>
            <Input type="text" name="Name" id="Name" onChange={this.onChangeUsername}  />
          </FormGroup>

          <FormGroup>
            <Label for="Description">Senha</Label>
            <Input type="text" name="Description" id="Description" onChange={this.onChangePassword} />
          </FormGroup>

          <Button>{'Login'}</Button>
        </Form>

     </div>
    );
  }
}
