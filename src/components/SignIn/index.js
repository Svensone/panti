import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { compose } from 'recompose'; // nesting of higher-order-functions become otherwise to verbose

// style
import './style.css';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => (
  <div className="signIn">
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  username: '',
  password: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  panelSwitch: '',
};

const ERROR_CODE_ACCOUNT_EXISTS = 
'auth/account-exists-with-different-credential'; 
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to 
this social account already exists. 
Try to login from this account instead 
and associate your social accounts on your personal account page. `;


class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // ------------ Sign-In Submit - Authentication -----

  // ------ with Email ----------
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

  // ------ with Google ----------

  onSubmitGoogle = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialUserAuth => {
        // Create a user in realtime DB
        return this.props.firebase.user(socialUserAuth.user.uid).set({
          username: socialUserAuth.user.displayName,
          email: socialUserAuth.user.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {

        if (error.code === ERROR_CODE_ACCOUNT_EXISTS){
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  };

  // ------------ with FACEBOOK ---------
  onSubmitFacebook = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialUserAuth => {
        return this.props.firebase
        .user(socialUserAuth.user.uid)
        .set({
          username: socialUserAuth.additionalUserInfo.profile.name,
          email: socialUserAuth.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS){
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  };

  // ----------------Sign-Up ----

  // remember to put in username later in const destructuring

  onSubmit1 = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // create User in Firebse Realtime Db
        return this.props.firebase
        .user(authUser.user.uid)
        .set({
          username,
          email,
          roles,
        });
      })
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

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // adding and removing the className for overlay of Signin/-up form to switch
  addClass() {
    this.setState({ panelSwitch: 'right-panel-active' });
  }
  removeClass() {
    this.setState({ panelSwitch: '' });
  }

  render() {
    const {
      username,
      email,
      password,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid = password === '' || email === '';
    const isInvalid1 =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <section className="signin" id="signin">
        <div
          className={`container ${this.state.panelSwitch}`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={this.onSubmit1}>
              <h1>Create Account</h1>
              
              <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
              <label htmlFor="">
                {' '}
                Admin :
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={this.onChangeCheckbox}
                />
              </label>

              <button disabled={isInvalid1} type="submit">
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={this.onSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a onClick={this.onSubmitFacebook} className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="social">
                  <i
                    className="fab fa-google-plus-g"
                    onClick={this.onSubmitGoogle}
                  />
                </a>
                </div>
              <span>or use your account</span>
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <PasswordForgetLink />
              <button disabled={isInvalid} type="submit">
                Sign In
              </button>
              {error && <p>{error.message}</p>}
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your
                  personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={this.removeClass.bind(this)}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Enter your personal details and start journey with
                  us
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={this.addClass.bind(this)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
