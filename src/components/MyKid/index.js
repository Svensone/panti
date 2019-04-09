import React from 'react';

import { withAuthorization } from '../Session';

import { Timeline } from './Timeline';
import { SocialMedia } from './Gallery';
import { Header } from './Header';
import { Profile } from './Profile';

// styles
import './style.css';

const MyKid = () => (
  <div className="main">
    <Header />
    <Profile />
    <SocialMedia />
    <Timeline />   
    <h1> History </h1>
    <h1> Balance & Accountability</h1>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MyKid);
