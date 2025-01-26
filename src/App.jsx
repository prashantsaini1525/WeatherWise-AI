
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage';
import GlobalComparisonPage from './pages/GlobalComparisonPage';
import ClimateChangePage from './pages/ClimateChangePage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/global-comparison">Global Comparison</Link></li>
            <li><Link to="/climate-change">Climate Change</Link></li>
            <li><Link to="/voice-assistant">Voice Assistant</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/global-comparison" element={<GlobalComparisonPage />} />
          <Route path="/climate-change" element={<ClimateChangePage />} />
          <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
