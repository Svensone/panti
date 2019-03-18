import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INTIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetBase extends Component {
  constructor(props){
    super(props);

    this.state = {...INTIAL_STATE};
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  };

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
        .then(() => {
          this.setState({ ...INTIAL_STATE});
        })
        .catch(error => {
          this.setState({ error })
        });

    event.preventDefault();

  }
  render(){
    const {email, error } = this.state;
    const isInvalid = email === '';
    return(
      <form onSubmit={this.onSubmit}>
        <input 
          name="email"
          value={this.state.email}
          onClick={this.onChange}
          type="text"
          placeholder="Email" />

        <button disabled={isInvalid} type="submit"> Submit </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = ()=> (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}> Forget Password? </Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetBase);

export { PasswordForgetForm, PasswordForgetLink };
