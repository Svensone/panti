import React from 'react';
import { withFirebase } from '../Firebase';

import './style.css';

const SignOutButton = ({ firebase }) => (
  <button
    activeClass="active"
    className="nav-link js-scroll-trigger"
    spy={true}
    smooth="easeInOutQuart"
    duration={1000}
    type="button"
    onClick={firebase.doSignOut}
    style={{ backgroundColor: '#212529', borderRadius: '10px' }}
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
