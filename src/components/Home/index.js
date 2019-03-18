import React from 'react';
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
  <div style={ style } ></div>

  </div>
);

export default Home;
//   <img src={Background} alt='' />