import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// style
import {
  Col,
  Button,
  Form,
  FormGroup,
  Container,
  Row,
  Input,
} from 'reactstrap';
import Background from '../../assets/img/02.jpeg';

import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  username: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { password, email, error } = this.state;

    const isInvalid = password === '' || email === '';
    var styles = {
      margin: '5rem',
      backgroundImage: `url(${Background})`,
      height: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    return (
      <div>
        <Form onSubmit={this.onSubmit} style={{ marginLeft: '2rem' }}>
          <h1>Sign-in</h1>
          <FormGroup>
            <Col sm={10}>
              <Input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={10}>
              <Input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Col>
          </FormGroup>
          <Container>
            <Row>
              <Col xs="3">
                <Button disabled={isInvalid} type="submit">
                  Sign In
                </Button>
              </Col>
              <Col xs="3">
                <PasswordForgetLink />
              </Col>
              <Col xs="3">
                <SignUpLink />
              </Col>
            </Row>
          </Container>

          {error && <p>{error.message}</p>}
        </Form>

        <div style={styles} />
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
