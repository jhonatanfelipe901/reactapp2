import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Container, Row, Col, Badge } from 'reactstrap'
import { CSVLink } from "react-csv"
import GameModal from '../Modals/GameModal'
import GameWinnerModal from '../Modals/GameWinnerModal'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import {connection} from '../Connection'

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], championships: []};
  }

  componentWillMount(){
    this.getChampionships();
  }
  
  componentDidMount(){
    this.getItems();
  }

  getItems(){
    fetch(`${connection}/api/game`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(items => this.setState({items: items.data != null ? items.data : []}))
      .catch(err => console.log(err))
  }

  getChampionships = () => {    
    fetch(`${connection}/api/championship/SelectList`)
      .then(items => this.state.championships = items.data)
      .catch(err => console.log(err))
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Deletar jogo?')
    if(confirmDelete){
      fetch(`${connection}/api/game?id=${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json(), window.location.reload(false))
      .catch(err => console.log(err))
    }
  }

  onChangeTeamASelect = e => {
    this.setState({teamAId: e.value})
  }

  render() {

    let selectList = this.state.championships;

    const items = this.state.items.map(item => {
      return (
        <tr key={item.Id}>
          <th scope="row">{item.id}</th>

          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.championshipName}</td>

          <td>{item.teamAName}</td>
          <td>{item.teamBName}</td>

          <td>{item.quantityGolsTeamA}</td>
          <td>{item.quantityGolsTeamB}</td>

          <td>{item.teamWinnerName ? item.teamWinnerName : '-'}</td> 
          <td>{item.active ? 'Sim' : 'Não'}</td>
          <td>{item.createDate}</td>
          <td>
            <div style={{width:"110px"}}>
              { !item.teamWinnerName && 
                <div>
                    <GameModal buttonLabel="Editar" item={item} updateState={this.props.updateState}/>                            
                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Deletar</Button>
                    <GameWinnerModal buttonLabel="Ganhador" item={item}/>   
                </div>    
              } 
              { item.teamWinnerName && 
                <div>
                  <Badge color="success">Finalizado</Badge>

                </div>    
              }                           
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Container className="App">
      <Row>
        <Col>
          <h1 style={{margin: "20px 0"}}>Lista de Jogos</h1>
        </Col>
      </Row>
      <Row>
          <Col>

          </Col>
      </Row>

      <Row>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Campeonato</th>
              <th>Time A</th>
              <th>Time B</th>
              <th>Gols Time A</th>
              <th>Gols Time B</th>
              <th>Time Ganhador</th>
              <th>Ativo</th>
              <th>Data Criacao</th>
              <th>Ações</th>
            </tr>
          </thead>
          
          <tbody>
            {items}
          </tbody>
        </Table>
      </Row>  

      <Row>
        <Col>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{float: "left", marginRight: "10px"}}
            className="btn btn-primary"
            data={this.state.items}>
            Download CSV
          </CSVLink>
          <GameModal buttonLabel="Adicionar Jogo" addItemToState={this.addItemToState}/>            
        </Col>
      </Row>

    </Container>

      
    )
  }
}

export default Game