import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';

const App = () => (
  <Router>
  <Routes>
    <Route path="/" element={<Homepage />} />
  </Routes>
</Router>
);

export default App;
