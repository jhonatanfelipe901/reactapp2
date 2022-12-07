import React, { lazy } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connection} from '../Connection'

class TeamFormAddEdit extends React.Component {
  state = {
    id: 0,
    name: '',
    logoImageUrl: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    fetch(`${connection}/api/team`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Name: this.state.Name,
        Description: this.state.Description,
        LogoImageUrl: this.state.LogoImageUrl
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    fetch(`${connection}/api/team`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.id,
        Name: this.state.name,
        Description: this.state.description,
        LogoImageUrl: this.state.logoImageUrl
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data 
    if(this.props.item){
      const { id, name, description, logoImageUrl } = this.props.item
      this.setState({ id, name, description, logoImageUrl, isAuth: true  })
    }
  }

  componentWillMount(){
    this.onChange = this.onChange.bind(this)
  } 

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="Name">Nome</Label>
          <Input type="text" name="Name" id="Name" onChange={this.onChange} value={this.props.item?.name === null ? '' : this.props.item?.name}  />
        </FormGroup>
        <FormGroup>
          <Label for="Description">Descrição</Label>
          <Input type="text" name="Description" id="Description" onChange={this.onChange} value={this.props.item?.description === null ? '' : this.props.item?.description}  />
        </FormGroup>
        <FormGroup>
          <Label for="LogoImageUrl">Logo Imagem Url</Label>
          <Input type="text" name="LogoImageUrl" id="LogoImageUrl" onChange={this.onChange} value={this.props.item?.logoImageUrl === null ? '' : this.props.item?.logoImageUrl}  />
        </FormGroup>
        <Button>{this.props.item ? 'Editar' : 'Salvar'}</Button>
      </Form>
    );
  }
}

export default TeamFormAddEdit