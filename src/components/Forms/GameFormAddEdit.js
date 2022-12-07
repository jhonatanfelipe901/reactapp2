import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select'
import { Toast, ToastBody } from "reactstrap"
import {connection} from '../Connection'

class GameFormAddEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: '',
      description: '',
      championshipId: 0,
      teamAId: 0,
      teamBId: 0,
      teams: [],
      championships: [],
      isShowSelectListTeam: false
    };
  }

  componentWillMount(){
    this.onChange = this.onChange.bind(this)
  } 

  componentDidMount(){

    console.log(this.props)
    // if item exists, populate the state with proper data 
    if(this.props.item){
      const { id, name, description, championshipId, teamAId, teamBId } = this.props.item
      this.setState({ id, name, description, championshipId, teamAId, teamBId, isAuth: true })
    }
  }

  getTeams = (championshipId) => {
    fetch(`${connection}/api/team/SelectList?championshipId=${parseInt(championshipId)}`)
      .then(response => response.json(), this.setState({isShowSelectListTeam: true, isAuth: true} ))
      .then(items => this.state.teams = items.data)
      .catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onChangeChampionshipSelect = e => {
    this.setState({championshipId: e.value})
    this.getTeams(e.value);
  }

  onChangeTeamASelect = e => {
    this.setState({teamAId: e.value, isAuth: true})
  }
  
  onChangeTeamBSelect = e => {
    this.setState({teamBId: e.value, isAuth: true})
  }

  submitFormAdd = e => {
    fetch(`${connection}/api/game`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Name: this.state.Name,
        Description: this.state.Description,
        ChampionshipId: this.state.championshipId,
        TeamAId: this.state.teamAId,
        TeamBId: this.state.teamBId
      })
    })
      .then(response => response.json(), this.setState({ isAuth: true }))
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {    
    fetch(`${connection}/api/game`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Name: this.state.Name,
        Description: this.state.Description,
        ChampionshipId: this.state.championshipId,
        TeamAId: this.state.teamAId,
        TeamBId: this.state.teamBId
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
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
          <Label for="Campeonato">Campeonato</Label>
          <Select
            options={this.props.championships}
            onChange={this.onChangeChampionshipSelect}
          />
        </FormGroup>

        <FormGroup>
          <Label for="TimeA">Time A</Label>
          <Select
            options={this.state.teams}
            onChange={this.onChangeTeamASelect}
            isDisabled={!this.state.isShowSelectListTeam}
          />
        </FormGroup>

        <FormGroup>
          <Label for="TimeB">Time B</Label>
          <Select
            options={this.state.teams}
            onChange={this.onChangeTeamBSelect}
            isDisabled={!this.state.isShowSelectListTeam}
          />
        </FormGroup>

        <Button>{this.props.item ? 'Editar' : 'Salvar'}</Button>
      </Form>
    );
  }
}

export default GameFormAddEdit