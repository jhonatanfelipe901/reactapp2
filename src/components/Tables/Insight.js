import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import {connection} from '../Connection'

class Insight extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], championshipsFinished: [], championshipsNotFinished: [], gamesFinished: [], gamesNotFinished: []};
  }

  componentDidMount(){
    this.getChampionshipInsights();
    this.getGamesInsights();
  }

  getChampionshipInsights(){
    fetch(`${connection}/api/insight/GetChampionshipInsights`)
      .then(response => response.json())
      .then(items => this.setState({championshipsFinished: items.data.championshipFinishedList != null ? items.data.championshipFinishedList : [], 
                                    championshipsNotFinished: items.data.championshipNotFinishedList != null ? items.data.championshipNotFinishedList : []}))
      .catch(err => console.log(err))

      console.log(this.state)
  }

  getGamesInsights(){
    fetch(`${connection}/api/insight/GetGamesInsights`)
      .then(response => response.json())
      .then(items => this.setState({gamesFinished: items.data.gameFinishedList != null ? items.data.gameFinishedList : [], 
                                    gamesNotFinished: items.data.gameNotFinishedList != null ? items.data.gameNotFinishedList : []}))
      .catch(err => console.log(err))

      console.log(this.state)
  }

  render() {

    const championshipsFinished = this.state.championshipsFinished.map(item => {
      return (
        <div>
          <ListGroupItem>{item.name}</ListGroupItem>
        </div>
      )
    })

    const championshipsNotFinished = this.state.championshipsNotFinished.map(item => {
      return (
        <div>
          <ListGroupItem>{item.name}</ListGroupItem>
        </div>
      )
    })  

    const gamesFinished = this.state.gamesFinished.map(item => {
      return (
        <div>
          <ListGroupItem>{item.name}</ListGroupItem>
        </div>
      )
    })

    const gamesNotFinished = this.state.gamesNotFinished.map(item => {
      return (
        <div>
          <ListGroupItem>{item.name}</ListGroupItem>
        </div>
      )
    })
      
    return (      
      <div>
        <Row>
          <Col xs={6}>
            <div>
              <h4>Campeonatos Finalizados</h4>
            </div>
            <div>
              <Card>
                <CardBody>
                  <ListGroup>
                    {championshipsFinished.length == 0 ? 'Nenhum registro.' : championshipsFinished}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>

          <Col xs={6}>
            <div>
              <h4>Campeonatos Não Finalizados</h4>
            </div>
            <div>
              <Card>
                <CardBody>
                  <ListGroup>
                    {championshipsNotFinished.length == 0 ? 'Nenhum registro.' : championshipsNotFinished}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xs={6}>
            <div>
              <h4>Jogos Finalizados</h4>
            </div>
            <div>
              
              <Card>
                <CardBody>
                  <ListGroup>
                    {gamesFinished.length == 0 ? 'Nenhum registro.' : gamesFinished}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>

          <Col xs={6}>
            <div>
              <h4>Jogos Não Finalizados</h4>
            </div>
            <div>
              <Card>
                <CardBody>
                    <ListGroup>
                      {gamesNotFinished.length == 0 ? 'Nenhum registro.' : gamesNotFinished}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </div>     
    );
  }
}

export default Insight