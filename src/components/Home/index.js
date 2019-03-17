import React from 'react';
import Background from './../../assets/img/bg-home.jpg';

var style = {
  width: "100%",
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