import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization, AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style={{ marginTop: '5rem' }}>
        <h1>Account: {authUser.email} </h1>
        <PasswordForgetForm />
        <br />
        <PasswordChangeForm />
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }

  componentDidMount() {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null }),
      )
      .catch(error => this.setState({ error }));
  }

  componentWillUnmount() {}

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div>
        {' '}
        Sign In Methods:
        <ul>
          {' '}
          {SIGN_IN_METHODS.map(signInMethod => {
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            );
            return (
              <li key={signInMethod.id}>
                {' '}
                {isEnabled ? (
                  <button type="button" onClick={() => {}}>
                    {' '}
                    Deactivate {signInMethod.id}{' '}
                  </button>
                ) : (
                  <button type="button" onClick={() => {}}>
                    {' '}
                    Link {signInMethod.id}
                  </button>
                )}{' '}
              </li>
            );
          })}{' '}
        </ul>{' '}
        {error && error.message}{' '}
      </div>
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

export default withAuthorization(condition)(AccountPage);
