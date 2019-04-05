import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// style 
import './style.css';

// importing the components
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import Home from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import MyKid from '../MyKid';
import { Footer } from '../BasicComponents/Footer';

// importing Routes
import * as ROUTES from '../../constants/routes';

// importing Context APIs
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.MYKID} component={MyKid} />
      <Footer />
    </div>
  </Router>
);

export default withAuthentication(App);
