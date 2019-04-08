import React from "react";
import { Jumbotron } from 'reactstrap';

// style
import "./header.css";



export const Header = props => {
  return (
    <section className="header" id="header">
     
    {/* --------------- Header --------------- */}
    
    <Jumbotron className="header">
      <div className="d-flex align-items-center justify-content-center">
        {/* <div className="animation" /> */}
        <div>
        <div className="avatar" />
        <br />
        <h2 className="intro-text text-center">Hi ! I'm Sinta </h2>
        </div>
        

      </div>
    </Jumbotron>
    </section>
  );
};
