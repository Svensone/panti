import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// importing the components
import Navigation from '../Navigation';

const App = () => (
  <Router>
    <Navigation />
  </Router>
);

export default App;
