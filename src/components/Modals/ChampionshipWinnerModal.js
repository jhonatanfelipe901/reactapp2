import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ChampionshipWinnerFormLook from '../Forms/ChampionshipWinnerFormLook'

class ChampionshipWinnerModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      let button = ''
      let title = 'Time Ganhador'

      const label = this.props.buttonLabel;

        button = 
        <Button
            color="success"
            onClick={this.toggle}
            style={{float: "left", marginRight:"10px"}}>{label}
        </Button>
      
      return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <ChampionshipWinnerFormLook
              item={this.props.item} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ChampionshipWinnerModal