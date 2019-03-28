import React from 'react';

import './style.css';

import { Header } from '../BasicComponents/Header';
import { Timeline } from '../BasicComponents/Timeline';
import ContactForm from '../BasicComponents/Contact';
import { Team } from '../BasicComponents/Team';
import SignInPage from '../SignIn';

const Landing = () => (
  <div>
    <Header />
    <Timeline />
    <ContactForm />
    <Team />
    <SignInPage />
  </div>
);

export default Landing;
