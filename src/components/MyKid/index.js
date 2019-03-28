import React from 'react';
import { withAuthorization } from '../Session';

import {Timeline} from './Timeline';
// styles
import './style.css';

const MyKid = () => (
  <div className="main">
    {/* --------------- Header --------------- */}
    <div className="header">
      <div className="container">
        <div className="avatar" />
        <br />
        <h2 className="intro-text">Hi ! I'm Risma </h2>
        <div className="" />
      </div>
    </div>
    {/* --------------- Intro --------------- */}
    <div className="profile">
      <h1> Profile Kids</h1>
      <br />
      <div className="info">
      <p>
        I'm from <strong> Yeh Sumbul </strong>{' '}
      </p>
      <p>
        <strong> 15 years </strong> old{' '}
      </p>
      <p>
        and I love to <strong> dance </strong>{' '}
      </p>
      </div>
      
    </div>

    {/* --------------- Timeline --------------- */}

    <Timeline />
    <h1> History </h1>
    <h1> Balance & Accountability</h1>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MyKid);
