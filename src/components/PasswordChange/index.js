import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

// style
import { Button, Form, FormGroup, Input, Col } from 'reactstrap';
import Background from '../../assets/img/sky1.jpg';

var styles = {
  margin: '5rem',
  backgroundImage: `url(${Background})`,
  height: '400px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { error, passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    return (
      <div>
        <Form onSubmit={this.onSubmit} style={{ marginLeft: '2rem' }}>
          <FormGroup>
            <Input
              name="passwordOne"
              value={passwordOne}
              type="password"
              placeholder="New Password"
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Input
              name="passwordTwo"
              value={passwordTwo}
              type="password"
              placeholder="Confirm New Password"
              onChange={this.onChange}
            />
          </FormGroup>

          <Button type="submit" disabled={isInvalid}>
            Reset My Password{' '}
          </Button>

          {error && <p>{error.message}</p>}
        </Form>
        <div style={styles} />
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
