import React from 'react';

import { withAuthorization } from '../Session';

// styles
import Background from './../../assets/img/bg-home.jpg';
var style = {
  marginTop: "5rem",
  marginLeft: "10rem",
  width: "50%",
  height: "300px",
  background: `url(${Background})`, 
}

const Home = () => (
  <div>
    <h1>Home</h1>
    <p> Only accessible for signed in Users </p>
  <div style={ style } ></div>

  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
