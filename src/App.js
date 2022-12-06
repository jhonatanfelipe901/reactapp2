import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";
import TutorialsList from "./components/TutorialsList";
import Team from "./components/Tables/Team";
import Game from "./components/Tables/Game";
import Championship from "./components/Tables/Championship";
import Insight from "./components/Tables/Insight";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import Login from "./components/Tables/Login";
import Main from "./components/Tables/Main";

function App() {
  
  return (
    <Main></Main>
  );
}

export default App;


