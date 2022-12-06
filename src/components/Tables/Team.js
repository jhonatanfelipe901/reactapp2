import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import TeamModal from '../Modals/TeamModal'
import { Container, Row, Col } from 'reactstrap'
import { CSVLink } from "react-csv"
import {connection} from '../Connection'

class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  componentDidMount(){
    this.getItems();
  }

  getItems = () => {
    fetch(`${connection}/api/team`)
      .then(response => response.json())
      .then(items => this.setState({items: items.data != null ? items.data : []}))
      .catch(err => console.log(err))
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Deletar este item?');
    
    if(confirmDelete){
        fetch(`${connection}/api/team?id=${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      .then(response => response.json(), window.location.reload(true))
      .catch(err => console.log(err))
      }
  }

  render() {

    const items = this.state.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>
            <div style={{width:"110px"}}>
              <TeamModal buttonLabel="Editar" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Deletar</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (

      <Container className="App">

        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Lista de Times</h1>
          </Col>
        </Row>

        <Row>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
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
            <TeamModal buttonLabel="Adicionar Time" addItemToState={this.addItemToState}/>
            
          </Col>
        </Row>

      </Container>
     
    )
  }
}

export default Team