import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import VoterDashboard from './components/VoterDashboard';
import OrganizerDashboard from './components/OrganizerDashboard';
import VoterVerification from './components/VoterVerification';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/voterverification" element={<VoterVerification />} />
        <Route path="/voter" element={<VoterDashboard />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
