import React from 'react';
import Background from '../../assets/img/barrel.jpg';

var styles = {
  margin: "5rem",
  backgroundImage: `url(${Background})`,
  height: "400px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
};

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <div style={ styles }></div>
  </div>
);

export default Landing;
