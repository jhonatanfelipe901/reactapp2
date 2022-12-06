import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ChampionshipWinnerFormLook extends React.Component {

  state = {
    ownerTeamName: ''
  }

  componentDidMount(){
    // if item exists, populate the state with proper data 
    if(this.props.item){
      console.log(this.props.item);
      const { ownerTeamName } = this.props.item
      this.setState({ ownerTeamName  })
    }
  }

  confirmForm = e => {

  }

  render() {
    return (
      <Form onSubmit={this.confirmForm}>
        <FormGroup>
          <Label for="Name">Time Ganhador</Label>
          <Input type="text" name="ownerTeam" id="ownerTeam" value={this.props.item?.ownerTeamName}  />
        </FormGroup>
        <Button>{'Confirmar'}</Button>
      </Form>
    );
  }
}

export default ChampionshipWinnerFormLook