import React from 'react';


import './style.css';

import { Header } from '../BasicComponents/Header';
import { Timeline } from '../BasicComponents/Timeline';
import { Contact } from '../BasicComponents/Contact';
import { Team } from '../BasicComponents/Team';
import SignInPage from '../SignIn';

const Landing = () => (
  <div>
    <Header />
    <Timeline />
    <Contact />
    <Team />
    <SignInPage />
  </div>
);

export default Landing;
