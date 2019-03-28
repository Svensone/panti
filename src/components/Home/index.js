import React from 'react';

import { withAuthorization } from '../Session';

// styles
import './style.css';

import { Header } from '../BasicComponents/Header';
import { Timeline } from '../BasicComponents/Timeline';
import ContactForm from '../BasicComponents/Contact';
import { Team } from '../BasicComponents/Team';



const Home = () => (
  <div>
    <Header />
    <Timeline />
    <Team />
    <ContactForm />

  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
