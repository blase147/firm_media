import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import AboutDetails from './components/about/aboutDetails';
import OurServicesDetails from './components/our services/ourServicesDetails';
import Contact from './components/contact/contact';
import MyPortfolio from './components/gallery/myPortfolio';
import Blog from './components/blog/blog';
import Pricing from './components/booking/pricing';
import BookNow from './components/booking/booknow';
import ArticleDetails from './components/blog/articleDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/aboutDetails" element={<AboutDetails />} />
      <Route path="/ourServicesDetails" element={<OurServicesDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portfolio" element={<MyPortfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/bookNow" element={<BookNow />} />
      <Route path="*" element={<ArticleDetails />} />
      <Route path="*">&quot;404 Not Found&quot;</Route>
    </Routes>
  </Router>
);

export default App;
