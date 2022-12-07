import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connection} from '../Connection'

class ChampionshipFormAddEdit extends React.Component {
  state = {
    id: 0,
    description: '',
    name: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value, isAuth: true})
  }

  submitFormAdd = e => {
    this.setState({isAuth: true})
    fetch(`${connection}/api/championship`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Name: this.state.Name,
        Description: this.state.Description
      })
    })
      .then(response => response.json(), this.setState({isAuth: true}))
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    fetch(`${connection}/api/championship`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.id,
        Name: this.state.name,
        Description: this.state.description
      })
    })
      .then(response => response.json(), this.setState({isAuth: true}))
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
        <Button>{this.props.item ? 'Editar' : 'Salvar'}</Button>
      </Form>
    );
  }
}

export default ChampionshipFormAddEdit