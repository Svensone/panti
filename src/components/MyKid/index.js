import React from 'react';
import { withAuthorization } from '../Session';

import { Timeline } from './Timeline';
// styles
import './style.css';

const MyKid = () => (
  <div className="main">
    {/* --------------- Header --------------- */}
    <div className="header section">
      <div className="container">
        <div className="avatar" />
        <div className="animation" />
        <br />
        <h2 className="intro-text">Hi ! I'm Sinta </h2>
        <div className="" />
      </div>
    </div>

    {/* --------------- Profile --------------- */}

    <div className="profile section">
      <div className="container">
        <h1> About Me </h1>
        <p> <em>
          "Hello, My name is <strong> Sinta Natalia Sagita Taopan </strong> . I was born on
          December 26 2001, so I am now <strong> 17 years old</strong> . I have on elder sister and
          2 younger sisters. My father is a builder. My parents don't
          have enough money to pay for my school fees so I have lived
          in Alas Kasih <strong> Orphanage since I was 9 years old </strong>. After I
          graduate from high school I aspire to work in tourism on a
          cruise ship, and to achieve this I need to go to university.
          I have to keep spirit and give all I can because I want to
          make my parents proud and everyone who loves me. I want to
          be a successful person so that later I can help other
          people. Even though I feel sad because I live in an
          orphanage and away from my family, I am still grateful to be
          in the orphanage where I have many friends and can learn
          many things."</em>
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
