import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import AboutDetails from './components/about/aboutDetails';
import OurServicesDetails from './components/our services/ourServicesDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/aboutDetails" element={<AboutDetails />} />
      <Route path="/ourServicesDetails" element={<OurServicesDetails />} />
    </Routes>
  </Router>
);

export default App;
