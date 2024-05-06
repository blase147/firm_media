import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import AboutDetails from './components/about/aboutDetails';
import OurServicesDetails from './components/our services/ourServicesDetails';
import Contact from './components/contact/contact';
import MyPortfolio from './components/gallery/myPortfolio';
import Blog from './components/blog/blog';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/aboutDetails" element={<AboutDetails />} />
      <Route path="/ourServicesDetails" element={<OurServicesDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portfolio" element={<MyPortfolio />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  </Router>
);

export default App;
