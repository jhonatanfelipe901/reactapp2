import React, { Component } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Team from "./Team";
import Game from "./Game";
import Championship from "./Championship";
import Insight from "./Insight";
import Login from "./Login";

import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {isAuth: true};
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  handleLogin = (auth) => {
    this.setState({isAuth: true});
  };

  handleLogout = () => {
    this.setState({isAuth: false});
  };

  render() {

    return (
        <div>
            { !this.state.isAuth && 
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a className="navbar-brand">
                        ChuteSal
                        </a>
                    </nav> 

                    <Container>
                        <Row>
                            <Col lg="8"></Col>
                        </Row>

                        <Row>
                            <Col /> 
                                <Col lg="8">
                                    <div>
                                    <h3>
                                        <u>Login</u>
                                    </h3>
                                    <hr />
                                    <Card>
                                        <CardBody>
                                            <Login onLogin={this.handleLogin} />
                                        </CardBody>
                                    </Card>
                                    </div>
                                </Col>
                            <Col />
                        </Row>
                    </Container>  
                </div>
              
              
            } 

            { this.state.isAuth &&
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a className="navbar-brand">
                        ChuteSal
                        </a>
                        <div className="navbar-nav mr-auto ">
                            <li className="nav-item">
                                <Link to={"/teams"} className="nav-link">
                                Times
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/games"} className="nav-link">
                                Jogos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/championships"} className="nav-link">
                                Campeonatos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/insights"} className="nav-link">
                                Insights
                                </Link>
                            </li>

                            <li className="nav-item ">
                                <Link onClick={this.handleLogout} className="nav-link">
                                Logout
                                </Link>
                            </li>
                        
                        </div>
                    </nav> 

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/teams"]} component={Team } />
                            <Route exact path={["/", "/games"]} component={Game} />
                            <Route exact path={["/", "/championships"]} component={Championship} />
                            <Route exact path={["/", "/insights"]} component={Insight} />
                        </Switch>
                    </div>
                </div>
            }
        </div>
    )
  }
  
}

export default Main