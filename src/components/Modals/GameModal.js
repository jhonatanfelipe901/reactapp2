import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import GameFormAddEdit from '../Forms/GameFormAddEdit'
import {connection} from '../Connection'

class GameModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      teams: []
    }
    
  }

  getChampionships(){
    fetch(`${connection}/api/championship/SelectList`)
      .then(response => response.json())
      .then(items => this.setState({championships: items.data != null ? items.data : [], isAuth: true}))
      .catch(err => console.log(err))
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal, isAuth: true
    }))
  }

  componentWillMount(){
    this.getChampionships();
  } 

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel

      let button = ''
      let title = ''

      if(label === 'Editar'){
        button = <Button
                  color="warning"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Editar'
      } else {
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Novo'
      }

      return (
        <div>
          {button}
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
            <ModalBody>
              <GameFormAddEdit
                championships={this.state.championships}
                teams={this.state.teams}
                addItemToState={this.props.addItemToState}
                updateState={this.props.updateState}
                toggle={this.toggle}
                item={this.props.item} />
            </ModalBody>
          </Modal>
        </div>
      )
    }
}

export default GameModal