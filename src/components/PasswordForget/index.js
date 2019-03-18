import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

//style 
import { Form, FormGroup, Col, Input, Button} from 'reactstrap';
import Background from '../../assets/img/sky1.jpg'
var styles = {
  margin: "5rem",
  backgroundImage: `url(${Background})`,
  height: "600px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
    <div style={ styles }></div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div>
        <h1 style={{ marginLeft: "2rem"}}>PasswordForget</h1>
      <Form onSubmit={this.onSubmit} style={{ marginLeft: "2rem"}}>
      <FormGroup>
        <Col xs="6">
        
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </Col>
        
      </FormGroup>
      <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        

        {error && <p>{error.message}</p>}
      </Form>
      
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };