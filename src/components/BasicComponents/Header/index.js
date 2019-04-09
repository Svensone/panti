import React from 'react';
import './style.css';



const Header = (props)=>{
  return <header className="masthead">
  <div className="container">
    <div className="intro-text">
      <div className="intro-lead-in">
      Welcome to the Orphanage <br /> <span id="intro-name"> <strong> Alas Kasih </strong> </span>  </div>
      {/* <div className="intro-heading text-uppercase">
      It's Nice To Meet You</div> */}
    </div>
  </div>
</header>
};

export { Header };