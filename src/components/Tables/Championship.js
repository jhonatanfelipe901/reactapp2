import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import { CSVLink } from "react-csv"
import ChampionshipModal from '../Modals/ChampionshipModal'
import ChampionshipWinnerModal from '../Modals/ChampionshipWinnerModal'
import {connection} from '../Connection'

class Championship extends Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  componentDidMount(){
    this.getItems();
  }

  getItems(){
    fetch(`${connection}/api/championship`)
      .then(response => response.json())
      .then(items => this.setState({items: items.data != null ? items.data : []}))
      .catch(err => console.log(err))
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Deletar jogo?')
    if(confirmDelete){
      fetch(`${connection}/api/championship?id=${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json(), this.getItems(), window.location.reload(true))
      .catch(err => console.log(err))
    }
  }

  getGameResult = result => {
    if(result === 1){
        return "Pendente";
    }
    else if(result === 2){
        return "Time A";
    } 
    else if(result === 3){
        return "Time B";
    }
  }

  render() {

    const items = this.state.items.map(item => {
      return (
        <tr key={item.Id}>
          <th scope="row">{item.id}</th>

          <th>{item.name}</th>
          <td>{item.description}</td>
          <td>{item.currentQuantityGame}</td>
          <td>{item.ownerTeamName == null ? '-' : item.ownerTeamName}</td>
          <td>{item.active ? 'Sim' : 'Não'}</td>
          <td>{item.createDate}</td>
          <td>
            <div style={{width:"110px"}}>
            { !item.isFinished && 
              <div>
                <ChampionshipModal buttonLabel="Editar" item={item} updateState={this.props.updateState}/>
                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Deletar</Button>
              </div>
            } 
             { item.isFinished && 
              <div>
                <ChampionshipWinnerModal buttonLabel="Time Ganhador" item={item}/>
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
            <h1 style={{margin: "20px 0"}}>Lista de Campeonatos</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
          <div>
            <h5>Quantidade Máxima Jogos: 3</h5>
          </div>
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
              <th>Jogo Atual</th>
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
            <ChampionshipModal buttonLabel="Adicionar Campeonato" addItemToState={this.addItemToState}/>            
          </Col>
        </Row>

      </Container>
    )
  }
}

export default Championship