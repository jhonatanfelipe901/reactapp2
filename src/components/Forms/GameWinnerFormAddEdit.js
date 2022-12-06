import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select'
import {connection} from '../Connection'

class GameWinnerFormAddEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      QuantityGolsTeamA: 0,
      QuantityGolsTeamB: 0
    };
  }

  componentWillMount(){
    this.onChange = this.onChange.bind(this)
  } 

  componentDidMount(){

    // if item exists, populate the state with proper data 
    if(this.props.item){
      const { id, championshipId } = this.props.item
      this.setState({ id, championshipId })
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    fetch('https://localhost:44357/api/game/PutWinner', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.id,
        QuantityGolsTeamA: parseInt(this.state.QuantityGolsTeamA),
        QuantityGolsTeamB: parseInt(this.state.QuantityGolsTeamB)
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))  
  }

  render() {

    return (
      <Form onSubmit={this.submitFormAdd}>

        <FormGroup>
          <Label for="Name">Time A - Quantidade de Gols</Label>
          <Input type="number" name="QuantityGolsTeamA" id="QuantityGolsTeamA" onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label for="Description">Time B - Quantidade de Gols</Label>
          <Input type="number" name="QuantityGolsTeamB" id="QuantityGolsTeamB" onChange={this.onChange}  />
        </FormGroup>

        <Button>{'Salvar'}</Button>
      </Form>
    );
  }
}

export default GameWinnerFormAddEdit