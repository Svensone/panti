import React from 'react';
import { withFirebase } from '../Firebase';

import './style.css';

const SignOutButton = ({ firebase }) => (
  <button
    // activeClass="active"
    className="nav-link js-scroll-trigger"
    spy={true}
    smooth="easeInOutQuart"
    duration={1000}
    type="button"
    onClick={firebase.doSignOut}
  >
    SIGN OUT
  </button>
);

export default withFirebase(SignOutButton);
