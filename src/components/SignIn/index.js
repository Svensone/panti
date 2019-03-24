import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { compose } from 'recompose'; // nesting of higher-order-functions become otherwise to verbose

// style
import './style.css';

import { SignUpLink } from '../SignUp';
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
  error: null,
  panelSwitch: '',
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // Sign-In Submit - Authentication
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
  // Sign-Up ---- remember to put in username later in const destructuring
  onSubmit1 = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // create User in Firebse Realtime Db
        this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
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
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email for registration</span>
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

              <button disabled={isInvalid1} type="submit">
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={this.onSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
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
                  console.log(`${process.env.REACT_APP_API_KEY}`);

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
